import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider
} from 'firebase/auth';
import { getApp } from 'firebase/app';
import { app } from './firebase';

class FirebaseModel {
  private static auth = getAuth(app);

  private static GoogleProvider = new GoogleAuthProvider();

  public static UserAccessGoogleToken: string = '';

  static createUserByEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`${errorCode} - ${errorMessage}`);
      });
  }

  static loginByEmailAndPassword(
    email: string,
    password: string,
    userSetter: any,
    indicator: any,
    persistData: boolean = true
  ): void {
    indicator(true);
    const auth = getAuth();
    let user: User | null = null;

    auth
      .setPersistence(browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            user = userCredential.user;
            userSetter(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(`${errorCode} - ${errorMessage}`);
          })
          .finally(() => {
            indicator(false);
          });
      })
      .catch((error) => {
        console.error(`${error.code} - ${error.message}`);
      });
  }

  static loginByGoogleAccount(
    userSetter: any,
    indicator: any,
    persistData: boolean = false
  ): void {
    let error = null;
    let token: string | undefined = '';
    const auth = getAuth();
    indicator(true);

    this.persistLogin(persistData, auth, () => {
      signInWithPopup(auth, this.GoogleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);

          if (credential) {
            token = credential.accessToken;
          }

          userSetter(result.user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error(
            `${errorCode}: ${errorMessage} - ${email} / ${credential}`
          );
        })
        .finally(() => {
          indicator(false);
        });
    });

    if (token) {
      this.UserAccessGoogleToken = token;
    }
  }

  private static persistLogin(
    persistData: boolean,
    auth: Auth,
    loginMethod: () => void
  ) {
    if (!persistData) {
      loginMethod();
      return;
    }

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return loginMethod();
      })
      .catch((error) => {
        console.error(`${error.code} - ${error.message}`);
      });
  }
}

export default FirebaseModel;
