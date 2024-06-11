import {provideFirebaseApp,initializeApp} from '@angular/fire/app';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';
import {provideAuth , getAuth} from '@angular/fire/auth';
import {provideStorage , getStorage} from '@angular/fire/storage';
import {provideFirestore , persistentLocalCache} from '@angular/fire/firestore'
import { getFirestore, initializeFirestore, persistentMultipleTabManager } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  provideRouter(routes),
  provideHttpClient(withFetch()),
  AngularFirestore, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ], 
};
