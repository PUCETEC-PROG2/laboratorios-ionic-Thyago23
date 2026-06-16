import React, { useEffect, useState } from 'react';
import { IonContent, IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonSpinner, IonBadge, IonCardHeader, IonCardTitle, IonCardSubtitle, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { githubService, UserProfile } from '../services/githubService';
import './ProfileTab.css';
const ProfileTab: React.FC = () => {
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

  if (loading) {
    return (
      <IonContent className="ion-padding ion-text-center">
        <IonSpinner />
      </IonContent>
    );
  }

  if (error) {
    return (
      <IonContent className="ion-padding ion-text-center">
        <IonLabel color="danger">Error: {error}</IonLabel>
      </IonContent>
    );
  }

  if (!profile) return null;

  return (
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
            <p>Desarrollador de software en pañales, experiencia en detodo un poco.</p>
            <p>Estudiante, de desarrollo de software y me gusta jugar videojuegos con amigos</p>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  );
};

export default ProfileTab;
