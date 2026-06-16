import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProfileTab from '../components/ProfileTab';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* ProfileTab ya contiene su propio IonContent, pero podemos colocarlo aquí. 
          Como ProfileTab usa IonContent, podríamos simplemente retornar ProfileTab
          o cambiar ProfileTab para que no tenga IonContent y ponerlo adentro. 
          Vamos a dejar que ProfileTab sea el contenido directamente. */}
      <ProfileTab />
    </IonPage>
  );
};

export default Tab1;
