import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel } from '@ionic/react';
import { githubService } from '../../services/GithubService';
import { UserProfile } from '../interfaces/Repository';
import LoadingSpinner from '../components/LoadingSpinner';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await githubService.getProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      {loading ? (
        <IonContent className="ion-padding ion-text-center">
          <LoadingSpinner />
        </IonContent>
      ) : error ? (
        <IonContent className="ion-padding ion-text-center">
          <IonLabel color="danger">Error: {error}</IonLabel>
        </IonContent>
      ) : profile ? (
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Perfil de usuario</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="card-container">
            <IonCard className="card">
              <img src={profile.avatar_url} alt="Foto de perfil" />
              <IonCardHeader>
                <IonCardTitle>{profile.name}</IonCardTitle>
                <IonCardSubtitle>{profile.login}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{profile.bio ? profile.bio : 'No hay biografía disponible en este perfil.'}</p>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{profile.public_repos}</strong>
                    <p style={{ margin: '5px 0 0', fontSize: '0.85em', color: 'var(--ion-color-medium)' }}>Repositorios</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{profile.followers}</strong>
                    <p style={{ margin: '5px 0 0', fontSize: '0.85em', color: 'var(--ion-color-medium)' }}>Seguidores</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      ) : null}
    </IonPage>
  );
};

export default Tab1;
