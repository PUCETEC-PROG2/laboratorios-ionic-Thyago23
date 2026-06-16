import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RepoList from '../components/RepoList';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RepoList />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
