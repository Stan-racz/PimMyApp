import { InjectRepository } from "@nestjs/typeorm"
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { captureError } from "rxjs/internal/util/errorContext"; import { AuthService } from "src/auth/auth.service";
import { Repository } from "typeorm/repository/Repository"
import { UserEntity } from "./models/user.entity"
import { User } from "./models/user.interface";

export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository:
            Repository<UserEntity>,
        private authService: AuthService
    ) { }

    create(user: UserEntity): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                // console.log("service ", user);

                const newUser = new UserEntity();
                newUser.nom = user.nom;
                newUser.prenom = user.prenom;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = user.role;
                newUser.civilite = user.civilite;
                newUser.status = user.status;
                newUser.dateNaiss = user.dateNaiss;
                newUser.nbHeureContractuelle = user.nbHeureContractuelle;
                newUser.id_service = user.id_service;
                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result } = user;
                        return result;
                    }),
                    catchError(err => throwError(() => {
                        console.log(err);

                        new Error(err);
                    }))
                )
            })
        )
    }
    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({
            where: {
                id: id
            }
        })).pipe(
            map((user: User) => {
                const { password, ...result } = user;
                return result;
            }),
            catchError(err => throwError(() => new Error('no user corresponding to that id')))
        );
    }

    findByName(nom: string, prenom: string): Observable<User> {
        return from(this.userRepository.findOne({
            relations: {
                id_service: true,
            },
            where: {
                nom: nom,
                prenom: prenom
            }
        }))
    }

    findByEmail(email: string): Observable<UserEntity> {
        console.log(email);

        return from(this.userRepository.findOne({
            where: {
                email: email,
            }
        })).pipe(
            map((user: UserEntity) => {
                const { password, ...result } = user;
                return result;
            }),
          catchError(err => throwError(() => new Error("Pas d'utilisateur correspondant à ce mail")))
        );
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) { delete v.password });
                return users;
            })
        );
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        return from(this.userRepository.update(id, user));
    }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      /**
       * If the user is valid, we generate a JWT for him
       * switchMap resolves the Observable and return the value
       */
      switchMap((user: User) => this.authService.generateJWT(user)),
      /**
       * If anything went wrong, an error will be thrown
       */
      catchError((err) => throwError(() => new Error(err.message))),
    );
  }

    validateUser(email: string, password: string): Observable<User> {
        return this.findByMail(email).pipe(
            switchMap((user: User) => (this.authService.comparePassords(password, user.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        const { password, ...result } = user;
                        return result;
                    } else {
                        console.log("yolo l'erreur")
                        throw new Error('les identifiants sont incorrects');
                    }
                })
            ))

            ));
    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOne({
            relations: {
                id_service: true,
            },
            where: {
                email: email
            }
        }));
    }
}
