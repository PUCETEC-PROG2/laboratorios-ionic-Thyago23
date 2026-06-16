import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonLabel, IonSpinner } from '@ionic/react';
import RepoItem from './RepoItem';
import { githubService, Repository } from '../services/githubService';

const RepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ion-text-center ion-padding">
        <IonLabel color="danger">Error: {error}</IonLabel>
      </div>
    );
  }

  return (
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
        />
      ))}
    </IonList>
  );
};

export default RepoList;
