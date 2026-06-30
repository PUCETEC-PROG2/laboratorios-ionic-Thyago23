import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, useIonToast, IonAlert } from '@ionic/react';
import { githubService } from '../../services/GithubService';
import { Repository } from '../interfaces/Repository';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [present] = useIonToast();
  const [isEditing, setIsEditing] = useState(false);
  const [repoToEdit, setRepoToEdit] = useState<Repository | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await githubService.getRepos();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleDelete = async (owner: string, repoName: string, id: number) => {
    try {
      await githubService.deleteRepo(owner, repoName);
      setRepos(repos.filter(r => r.id !== id));
      present({
        message: 'Repositorio eliminado exitosamente',
        duration: 3000,
        color: 'success',
        position: 'bottom'
      });
    } catch (err: any) {
      present({
        message: `Error al eliminar repositorio: ${err.message}`,
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
    }
  };

  const handleEditClick = (repo: Repository) => {
    setRepoToEdit(repo);
    setIsEditing(true);
  };

  const handleEditSubmit = async (data: any) => {
    if (!repoToEdit) return;
    try {
      const updatedRepo = await githubService.updateRepo(repoToEdit.owner.login, repoToEdit.name, {
        name: data.name,
        description: data.description
      });
      setRepos(repos.map(r => r.id === updatedRepo.id ? updatedRepo : r));
      present({
        message: 'Repositorio actualizado exitosamente',
        duration: 3000,
        color: 'success',
        position: 'bottom'
      });
    } catch (err: any) {
      present({
        message: `Error al actualizar repositorio: ${err.message}`,
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
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
      ) : (
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Repositorios</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonListHeader>
              <IonLabel>Repositories</IonLabel>
            </IonListHeader>
            {repos.map((repo) => (
              <RepoItem
                key={repo.id}
                name={repo.name}
                description={repo.description}
                stars={repo.stargazers_count}
                language={repo.language}
                url={repo.html_url}
                avatarUrl={repo.owner?.avatar_url}
                onDelete={() => handleDelete(repo.owner.login, repo.name, repo.id)}
                onEdit={() => handleEditClick(repo)}
              />
            ))}
          </IonList>
        </IonContent>
      )}
      
      <IonAlert
        isOpen={isEditing}
        onDidDismiss={() => setIsEditing(false)}
        header="Editar Repositorio"
        inputs={[
          {
            name: 'name',
            type: 'text',
            value: repoToEdit?.name,
            placeholder: 'Nombre del repositorio'
          },
          {
            name: 'description',
            type: 'textarea',
            value: repoToEdit?.description,
            placeholder: 'Descripción'
          }
        ]}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Guardar',
            handler: handleEditSubmit
          }
        ]}
      />
    </IonPage>
  );
};

export default Tab2;
