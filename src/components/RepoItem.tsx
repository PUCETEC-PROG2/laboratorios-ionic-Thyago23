import React from 'react';
import { IonItem, IonLabel, IonBadge, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonAvatar } from '@ionic/react';
import { starOutline, pencil, trash } from 'ionicons/icons';

export interface RepoItemProps {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  avatarUrl?: string;
}

const RepoItem: React.FC<RepoItemProps> = ({ name, description, stars, language, url, avatarUrl }) => {
  return (
    <IonItemSliding>
      <IonItem button detail={true} href={url} target="_blank">
        {avatarUrl && (
          <IonAvatar slot="start">
            <img src={avatarUrl} alt="Owner avatar" />
          </IonAvatar>
        )}
        <IonLabel className="ion-text-wrap">
          <h2>{name}</h2>
          <p>{description}</p>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
            {language && <IonBadge color="primary">{language}</IonBadge>}
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IonIcon icon={starOutline} />
              {stars}
            </span>
          </div>
        </IonLabel>
      </IonItem>
      
      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={() => console.log('Edit clicked')}>
          <IonIcon slot="icon-only" icon={pencil} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => console.log('Delete clicked')}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
