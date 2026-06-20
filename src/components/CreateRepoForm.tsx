import React, { useState } from 'react';
import { IonList, IonItem, IonInput, IonTextarea, IonToggle, IonButton, useIonToast } from '@ionic/react';
import { githubService, CreateRepoData } from '../services/githubService';

const CreateRepoForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [present] = useIonToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const repoData: CreateRepoData = {
        name,
        description
      };
      await githubService.createRepo(repoData);

      present({
        message: 'Repositorio creado exitosamente',
        duration: 3000,
        color: 'success',
        position: 'bottom'
      });

      setName('');
      setDescription('');

    } catch (err: any) {
      present({
        message: `Error al crear repositorio: ${err.message}`,
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonInput
            label="Nombre del Repositorio"
            labelPlacement="floating"
            value={name}
            onIonInput={e => setName(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            label="Descripción"
            labelPlacement="floating"
            value={description}
            onIonInput={e => setDescription(e.detail.value!)}
          />
        </IonItem>
      </IonList>
      <div className="ion-padding">
        <IonButton expand="block" type="submit" disabled={!name.trim()}>
          Crear Repositorio
        </IonButton>
      </div>
    </form>
  );
};

export default CreateRepoForm;
