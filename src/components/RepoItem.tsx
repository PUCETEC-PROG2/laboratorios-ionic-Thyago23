import React from 'react';
import { IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonAvatar } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import './RepoItem.css';

export interface RepoItemProps {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  avatarUrl?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ name, description, stars, language, url, avatarUrl, onDelete, onEdit }) => {
  return (
    <IonItemSliding>
      <IonItem button detail={true} href={url} target="_blank">
        {avatarUrl && (
          <IonAvatar slot="start" className="square-avatar">
            <img src={avatarUrl} alt="Owner avatar" />
          </IonAvatar>
        )}
        <IonLabel className="ion-text-wrap">
          <h2>{name}</h2>
          {description && <p>{description}</p>}
          <p>Lenguaje: {language || ''}</p>
        </IonLabel>
      </IonItem>
      
      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={onEdit}>
          <IonIcon slot="icon-only" icon={pencil} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
