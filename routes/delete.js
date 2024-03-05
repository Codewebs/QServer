var Sequelize = require('sequelize');
var { Enseignant, Augmentation, Avantage, Heuretravail, Indemnite, Constant, Intervalle, Periode, Prime, Profil,ProfilTaxe, UserSchool,
Taxe,Traitement, Typeelement,InscriptionEnseignant, Typeperiode, Utilisateur, AnneeScolaire, Service,Etablissement,Avance,Acompte,PaiementAvance,PaiementAcompte } = require('../tables/seqtables');


module.exports = (app) => {

// Supprimer une prime
app.delete('/deletePrime/:id', (req, res) => {
  Prime.destroy({ where: { IDprime: req.params.id } })
    .then(() => res.status(200).send('Prime supprimée avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de la prime');
    });
});

// Route pour supprimer une période
app.delete('/deletePeriode/:IDperiode', (req, res) => {
  Periode.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Période supprimée avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de la période');
    });
});
app.delete('/deletePeriodePro/:IDperiode', async (req, res) => {
  const { IDperiode } = req.params;

  try {
    // Récupérer la période à supprimer
    const periode = await Periode.findOne({ where: { IDperiode } });
    if (!periode) {
      return res.status(404).send('Période non trouvée');
    }

    // Vérifier si la période est ouverte
    if (!periode.ouvert) {
      return res.status(400).send('Impossible de supprimer une période Cloturée');
    }

    // Vérifier s'il existe des traitements associés à cette période
    const traitements = await Traitement.findAll({ where: { IDperiode, IDannee: periode.IDannee } });
    if (traitements.length > 0) {
      return res.status(400).send('Impossible de supprimer une période avec des traitements associés');
    }

    // Vérifier si la période a l'ordre le plus élevé pour cette année
    const highestOrderPeriode = await Periode.findOne({ 
      where: { IDannee: periode.IDannee },
      order: [['ordre', 'DESC']]
    });
    if (highestOrderPeriode.IDperiode !== periode.IDperiode) {
      return res.status(400).send('Impossible de supprimer une période qui n\'a pas l\'ordre le plus élevé pour cette année');
    }

    // Supprimer la période
    await periode.destroy();

    res.status(200).send('Période supprimée avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression de la période');
  }
});
// Supprimer une augmentation
app.delete('/deleteAugmentation/:id', (req, res) => {
  Augmentation.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Augmentation supprimée avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'augmentation');
    });
});

// Supprimer un avantage
app.delete('/deleteAvantage/:id', (req, res) => {
  Avantage.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Avantage supprimé avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'avantage');
    });
});

// Supprimer une heure de travail
app.delete('/deleteHeuretravail/:id', (req, res) => {
  Heuretravail.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Heure de travail supprimée avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'heure de travail');
    });
});

// Supprimer une indemnité
app.delete('/deleteIndemnite/:id', (req, res) => {
  Indemnite.destroy({ where: { IDindemnite: req.params.id } })
    .then(() => res.status(200).send('Indemnité supprimée avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'indemnité');
    });
});

// Supprimer une constante
app.delete('/deleteConstante/:id', (req, res) => {
  Constante.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Constante supprimée avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de la constante');
    });
});

// Supprimer un intervalle
app.delete('/deleteIntervalle/:id', (req, res) => {
  Intervalle.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Intervalle supprimé avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'intervalle');
    });
});

app.delete('/deleteInscriptionEnseignant/:id', async (req, res) => {
  const idInscription = req.params.id;

  // Vérifier si l'enseignant a des traitements, augmentations, avances ou acomptes
  const hasTraitement = await Traitement.count({ where: { idInscription } });
  const hasAugmentation = await Augmentation.count({ where: { idInscription } });
  const hasAvance = await Avance.count({ where: { idInscription } });
  const hasAcompte = await Acompte.count({ where: { idInscription } });

  if (hasTraitement || hasAugmentation || hasAvance || hasAcompte) {
    let message = 'L\'enseignant a ';
    if (hasTraitement) message += 'des traitements, ';
    if (hasAugmentation) message += 'des augmentations, ';
    if (hasAvance) message += 'des avances, ';
    if (hasAcompte) message += 'des acomptes, ';
    message = message.slice(0, -2); // Enlever la dernière virgule et l'espace
    message += '. Veuillez les supprimer d\'abord.';
    res.status(400).send(message);
  } else {
    InscriptionEnseignant.destroy({ where: { idInscription } })
      .then(() => res.status(200).send('Inscription enseignant supprimée avec succès'))
      .catch(err => {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de l\'inscription enseignant');
      });
  }
});
app.delete('/deleteEnseignant/:id', async (req, res) => {
  const idEnseignant = req.params.id;

  // Vérifier si l'enseignant a des traitements, augmentations, avances ou acomptes
  const hasTraitement = await Traitement.count({ where: { idEnseignant } });
  const hasAugmentation = await Augmentation.count({ where: { idEnseignant } });
  const hasAvance = await Avance.count({ where: { idEnseignant } });
  const hasAcompte = await Acompte.count({ where: { idEnseignant } });

  if (hasTraitement || hasAugmentation || hasAvance || hasAcompte) {
    let message = 'L\'enseignant a ';
    if (hasTraitement) message += 'des traitements, ';
    if (hasAugmentation) message += 'des augmentations, ';
    if (hasAvance) message += 'des avances, ';
    if (hasAcompte) message += 'des acomptes, ';
    message = message.slice(0, -2); // Enlever la dernière virgule et l'espace
    message += '. Veuillez les supprimer d\'abord.';
    res.status(400).send(message);
  } else {
    // Supprimer l'inscription de l'enseignant
    InscriptionEnseignant.destroy({ where: { idEnseignant } })
      .then(() => {
        // Supprimer l'enseignant
        Enseignant.destroy({ where: { idEnseignant } })
          .then(() => res.status(200).send('Enseignant supprimé avec succès'))
          .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression de l\'enseignant');
          });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de l\'inscription enseignant');
      });
  }
});

app.delete('/deleteTraitements/:IDutilisateur/:IDperiode/:IDannee', async (req, res) => {
  console.log(req.params)
  const { IDutilisateur, IDperiode, IDannee } = req.params;
  console.log(req.params)
  
  try {
    await Traitement.destroy({
      where: {
        IDutilisateur: IDutilisateur,
        IDperiode: IDperiode,
        IDannee: IDannee
      }
    });
    res.status(200).send('Traitements supprimés avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression des traitements');
  }
});

app.delete('/deleteTraitement/:IDutilisateur/:IDperiode/:IDannee', (req, res) => {
  console.log(req.params)
  const { IDutilisateur, IDperiode, IDannee } = req.params;
  Traitement.destroy({ where: {
        IDutilisateur: IDutilisateur,
        IDperiode: IDperiode,
        IDannee: IDannee
      } })
    .then(() => res.status(200).send('Traitement supprimé avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du traitement');
    });
});
// Supprimer un traitement
app.delete('/deleteTraitement/:id', (req, res) => {
  Traitement.destroy({ where: { IDtraitement: req.params.id } })
    .then(() => res.status(200).send('Traitement supprimé avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du traitement');
    });
});

// Supprimer un type d'élément
app.delete('/deleteTypeelement/:id', (req, res) => {
  Typeelement.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Type d\'élément supprimé avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du type d\'élément');
    });
});

// Supprimer un type de période
app.delete('/deleteTypeperiode/:id', (req, res) => {
  Typeperiode.destroy({ where: { IDtype: req.params.id } })
    .then(() => res.status(200).send('Type de période supprimé avec succès'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du type de période');
    });
});

}