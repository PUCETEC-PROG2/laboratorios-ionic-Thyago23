import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CreateRepoForm from '../components/CreateRepoForm';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CreateRepoForm />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
