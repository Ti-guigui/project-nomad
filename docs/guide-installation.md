# Guide complet : installer Project N.O.M.A.D. (version française) sur un PC (Ubuntu + clé USB bootable)

> **Qu'est-ce que c'est ?** Project N.O.M.A.D. est un **serveur de connaissances hors ligne**, gratuit et open source (licence Apache 2.0). Il réunit Wikipédia hors ligne (Kiwix), des cours Khan Academy (Kolibri), des cartes hors ligne, une IA locale (Ollama), des outils de chiffrement (CyberChef), des notes, etc. Il s'installe **sur Linux (Ubuntu)** et **tout s'utilise dans un navigateur web**, depuis le PC lui-même ou depuis n'importe quel ordinateur ou téléphone du même réseau.
>
> - **Ce guide installe la version française** : https://github.com/Ti-guigui/project-nomad (interface et documentation en français, Wikipédia en français, cartes de France et d'outre-mer)
> - Projet d'origine (en anglais) : https://github.com/Crosstalk-Solutions/project-nomad
> - Site officiel : https://www.projectnomad.us (guide : https://www.projectnomad.us/install)
> - **Vidéo officielle pas à pas (en anglais, 14 min)** : https://www.youtube.com/watch?v=Ab5EbJmf7xE. Elle montre la version d'origine : les étapes sont les mêmes, seuls la commande d'installation (partie 5) et les menus, ici en français, changent.
> - Vidéo « Accès à NOMAD en Wi-Fi » : https://www.youtube.com/watch?v=BNXpXPYV-5A

## Le principe en un schéma

```
 ┌──────────────┐  1. on crée        ┌──────────────┐  2. on démarre le PC   ┌───────────────────────┐
 │ Votre PC     │ ─────────────────▶ │ Clé USB      │ ─────────────────────▶ │ PC « serveur NOMAD »  │
 │ Windows/Mac  │  la clé (Rufus/    │ Ubuntu 26.04 │  sur la clé, on        │ Ubuntu + NOMAD        │
 └──────────────┘  Etcher)           └──────────────┘  installe Ubuntu       └──────────┬────────────┘
                                                        puis NOMAD                       │ réseau (box / routeur)
                                       ┌─────────────────────────┬───────────────────────┤
                                  ┌────▼─────┐             ┌──────▼─────┐          ┌──────▼─────┐
                                  │ Portable │             │ Téléphone  │          │ Tablette   │
                                  │ navigateur│            │ navigateur │          │ navigateur │
                                  │ http://IP:8080         │ http://IP:8080        │ http://IP:8080
                                  └──────────┘             └────────────┘          └────────────┘
```

**Important à comprendre :** la clé USB **sert seulement à installer Ubuntu**. NOMAD ne « tourne » pas depuis la clé. Une fois l'installation terminée, on retire la clé. Les autres ordinateurs **n'ont rien à installer** : ils ouvrent simplement une adresse dans leur navigateur.

---

## 0. AVANT DE COMMENCER : les avertissements (à lire absolument)

| ⚠️ Risque | Ce qu'il faut faire |
|---|---|
| **Le disque du PC cible sera EFFACÉ** (le guide officiel le dit : *« The PC you're installing on will be wiped completely »*). | Utilisez un PC dédié (un vieux PC, un mini-PC) ou **sauvegardez tout** (documents, photos, mots de passe, clés de licence) sur un disque externe ou dans le cloud **avant** de commencer. |
| **La clé USB sera EFFACÉE.** | Copiez ailleurs ce qu'elle contient. |
| Vous voulez garder Windows (double démarrage). | **Non recommandé pour un débutant.** Ce n'est pas le scénario officiel de NOMAD. Si vous y tenez : sauvegarde complète, puis désactivation de BitLocker (Ubuntu vous bloquera sinon), et choix de « Installer Ubuntu à côté de Windows ». La solution la plus sûre reste **un deuxième disque dédié à Ubuntu**. Autre possibilité sans toucher Windows : le guide WSL2, soutenu par la communauté et non officiel : https://www.projectnomad.us/install/wsl2 |
| PC Mac, Raspberry Pi, ARM, machine virtuelle. | **Pas pris en charge officiellement.** Le script n'accepte officiellement que les processeurs **x86_64** (Intel/AMD 64 bits). Sur ARM, il affiche un avertissement et risque d'échouer. |
| Aucune authentification. | NOMAD n'a **pas de mot de passe** : toute personne de votre réseau y a accès. **Ne l'exposez jamais sur Internet** (pas de redirection de port sur la box). |

---

## 1. Ce qu'il vous faut

### 1.1 Matériel

| | Minimum (sans IA) | Recommandé (avec IA locale) |
|---|---|---|
| Processeur | Double cœur 2 GHz, **x86-64** | AMD Ryzen 7 / Intel Core i7 ou mieux |
| Mémoire vive | 4 Go (NOMAD sans IA consomme < 1 Go) | 32 Go (16 Go est confortable, 8 Go suffit pour un petit modèle) |
| Carte graphique | Inutile | NVIDIA RTX 3060 ou équivalent AMD (plus de VRAM = plus gros modèles) |
| Stockage | 5 Go pour NOMAD (prévoir 10 Go) + votre contenu | 250 Go minimum, idéalement SSD ; **1 To** pour Wikipédia complet avec images + Khan Academy |
| Internet | **Indispensable pendant l'installation** et pour télécharger le contenu. Ensuite, tout fonctionne hors ligne. | idem |

Repères de taille : Wikipédia en français de 136 Mo (référence rapide) à environ 53 Go (version intégrale avec images), Khan Academy ≈ 50 Go, références médicales ≈ 500 Mo, une carte régionale ≈ 2 à 3 Go, modèles d'IA 10 à 40 Go. Avec l'assistant IA, l'installation de base passe à environ 25 Go.

Autres éléments :
- **Une clé USB de 16 Go** (Ubuntu recommande 12 Go ou plus, et l'image fait environ 6 Go). Préférez une clé USB 3.0 de marque.
- Un **câble Ethernet** si possible : c'est plus fiable que le Wi-Fi pour l'installation et pour un serveur.
- Un autre ordinateur (Windows ou Mac) pour fabriquer la clé.
- Écran, clavier et souris pour le PC cible, au moins pendant l'installation.

### 1.2 Téléchargements (liens officiels)

| Quoi | Où |
|---|---|
| **Ubuntu Desktop 26.04 LTS** (version recommandée par NOMAD ; 24.04 LTS et Debian 12 restent pris en charge). Prenez le fichier **amd64** (environ 6 Go), qui donne un fichier `ubuntu-26.04.x-desktop-amd64.iso`. | https://ubuntu.com/download/desktop |
| **Rufus** (sous Windows) | https://rufus.ie/fr/ |
| **balenaEtcher** (sous Mac, Windows ou Linux) | https://etcher.balena.io/ |

> 💡 **Ne prenez pas** la version « arm64 » proposée sur la même page : elle ne conviendra pas à un PC classique.

**Facultatif : vérifier que l'ISO n'est pas corrompu** (utile si la clé ne démarre pas ensuite). Sous Windows, ouvrez **PowerShell** et tapez la commande ci-dessous (`certutil` est un outil standard de Windows), puis comparez le résultat avec l'empreinte SHA256 indiquée sur la page de téléchargement d'Ubuntu :
```
certutil -hashfile "$env:USERPROFILE\Downloads\ubuntu-26.04.1-desktop-amd64.iso" SHA256
```
(adaptez le nom du fichier au vôtre).

---

## 2. Créer la clé USB bootable

### 2A. Sous Windows avec Rufus

1. Branchez la clé USB et **fermez l'explorateur de fichiers** qui s'ouvre.
2. Lancez `rufus-4.x.exe` (pas besoin de l'installer). Répondez **Oui** à la question de Windows (« Voulez-vous autoriser… ») et à la question sur les mises à jour.
3. Réglez la fenêtre comme ceci :

```
┌─────────────────── Rufus 4.x ────────────────────┐
│ Propriétés du périphérique                       │
│  Périphérique      : [ CLE_USB (E:) 16 Go    ▼ ] │ ◀── VÉRIFIEZ que c'est bien la clé !
│  Type de démarrage : [ ubuntu-26.04…iso ▼][SÉLECTION] ◀── cliquez SÉLECTION, choisissez l'ISO
│  Schéma de partition : [ GPT               ▼ ]   │ ◀── GPT (PC récents, UEFI)
│  Système de destination : [ UEFI (non CSM) ▼ ]   │ ◀── se règle tout seul
│ Options de formatage                             │
│  Nom de volume     : [ Ubuntu 26.04 …       ]    │ ◀── laissez tel quel
│  Système de fichiers : [ FAT32 (Défaut)    ▼ ]   │ ◀── laissez la valeur par défaut
│  Taille d'unité d'allocation : [ défaut ▼ ]      │
│ Statut :              PRÊT                       │
│                       [ DÉMARRER ]  [ FERMER ]   │
└──────────────────────────────────────────────────┘
```
   - **Périphérique** : la clé USB. ⚠️ Si un disque dur externe est branché, **débranchez-le** pour ne pas vous tromper.
   - **Type de démarrage** : « Disque ou image ISO », puis bouton **SÉLECTION** pour choisir le fichier `.iso` téléchargé.
   - **Schéma de partition** : **GPT** pour tout PC postérieur à 2012 environ. *Pour un très vieux PC sans UEFI, choisissez **MBR**, ce qui donne « BIOS ou UEFI ».*
   - Pour le reste, **gardez les valeurs par défaut** (c'est la consigne officielle de NOMAD : *« Keep the defaults and hit Start »*).
4. Cliquez sur **DÉMARRER**.
5. Une fenêtre « Image ISOHybride détectée » s'ouvre : choisissez **« Écrire en mode Image ISO (Recommandé) »**, puis **OK**. *(C'est le « ISO mode » du guide NOMAD et le « Write in ISO Image mode » du tutoriel Ubuntu.)*
6. Si Rufus propose de télécharger des fichiers supplémentaires, répondez **Oui**.
7. Avertissement « Toutes les données du périphérique vont être détruites » : répondez **OK** (vous avez fait la sauvegarde).
8. Attendez que la barre verte affiche **PRÊT**, puis cliquez sur **FERMER** et éjectez la clé.

> 🔧 **Si l'écriture échoue en mode ISO** ou si la clé ne démarre pas ensuite : recommencez en choisissant **« Écrire en mode Image DD »** à l'étape 5, ou utilisez balenaEtcher.

### 2B. Sous Mac (ou Windows/Linux) avec balenaEtcher

1. Installez balenaEtcher depuis https://etcher.balena.io/ (sur Mac, glissez l'application dans *Applications*. Au premier lancement, si macOS bloque l'ouverture, faites clic droit, puis **Ouvrir**).
2. Branchez la clé USB.
3. Dans Etcher, suivez les trois boutons de gauche à droite :

```
┌───────────────────────── balenaEtcher ─────────────────────────┐
│   [ Flash from file ]  ──▶  [ Select target ]  ──▶  [ Flash! ] │
│    ubuntu-26.04…iso          CLE USB 16 GB                     │
└────────────────────────────────────────────────────────────────┘
```
   - **Flash from file** : choisissez le fichier `.iso` d'Ubuntu.
   - **Select target** : cochez **la clé USB** (vérifiez sa taille ; ne choisissez jamais votre disque interne).
   - **Flash!** : macOS demande le mot de passe de votre session Mac. Tapez-le.
4. Attendez « Flash Complete! » (Etcher vérifie aussi la copie).
5. ⚠️ Si macOS affiche **« Le disque que vous avez inséré n'est pas lisible par cet ordinateur »**, c'est **normal** : cliquez sur **Éjecter** ou **Ignorer**, **jamais sur « Initialiser »**.

---

## 3. Démarrer le PC sur la clé USB

### 3.1 Méthode rapide : le menu de démarrage

1. Branchez la clé sur le PC cible (de préférence directement sur la carte mère, à l'arrière pour un PC fixe) **et le câble Ethernet**.
2. Allumez le PC et **tapotez immédiatement** la touche du menu de démarrage (Boot Menu), environ deux fois par seconde.
3. Choisissez la ligne qui contient **« UEFI: »** suivie du nom de la clé (par ex. `UEFI: SanDisk Ultra`).

Touches habituelles **[non vérifié sur source officielle : varie selon les modèles, consultez le manuel du PC]**. Ubuntu cite F12 comme la plus courante, puis Échap, F2 et F10. Le guide NOMAD cite **Suppr (Del) ou F2** pour entrer dans le BIOS.

| Marque | Menu de démarrage | Entrer dans le BIOS/UEFI |
|---|---|---|
| Dell | F12 | F2 |
| HP | F9 (ou Échap puis F9) | F10 (ou Échap puis F10) |
| Lenovo | F12 (ou Fn+F12, ou bouton « Novo ») | F1 ou F2 |
| Acer | F12 (à activer parfois dans le BIOS) | F2 ou Suppr |
| Asus | F8 (PC fixe) / Échap (portable) | Suppr ou F2 |
| MSI | F11 | Suppr |
| Gigabyte | F12 | Suppr |
| ASRock | F11 | F2 ou Suppr |
| Toshiba/Dynabook | F12 | F2 |
| Mini-PC divers | F7, F11 ou F12 | Suppr ou F2 |

### 3.2 Si le PC démarre directement sous Windows

Méthode passant par Windows, **[non vérifié sur source officielle NOMAD, procédure standard de Windows 10/11]** : dans Windows, cliquez sur **Démarrer**, puis **Marche/Arrêt**, et **maintenez la touche Maj (Shift)** en cliquant sur **Redémarrer**. Ensuite :
- **Utiliser un périphérique**, puis choisissez la clé USB ; **ou**
- **Dépannage**, puis **Options avancées**, puis **Paramètres du microprogramme UEFI**, puis **Redémarrer**, ce qui ouvre le BIOS.

### 3.3 Méthode officielle : changer l'ordre de démarrage dans le BIOS

D'après projectnomad.us/install :
1. Appuyez sur **Suppr** ou **F2** au démarrage pour entrer dans le BIOS.
2. Allez dans la section **Boot** (Démarrage).
3. Trouvez **Boot order / Boot Option Priorities**.
4. **Placez la clé USB en première position.**
5. **Save & Exit** (souvent touche **F10**), puis confirmez par **Yes**.

```
┌──────────────── BIOS / UEFI Setup ─────────────────┐
│  Main   Advanced   Security   [Boot]   Save & Exit │
│  ─────────────────────────────────────────────────  │
│  Boot Option Priorities                            │
│   Boot Option #1   [UEFI: SanDisk Ultra 16GB]  ◀── │ la clé en premier
│   Boot Option #2   [Windows Boot Manager]          │
│  Secure Boot       [Enabled]                       │
│  F10: Save & Exit                                  │
└────────────────────────────────────────────────────┘
```

### 3.4 Problèmes fréquents au démarrage (dépannage)

| Symptôme | Solution |
|---|---|
| La clé n'apparaît pas dans la liste. | Essayez un autre port USB (USB 2.0 noir de préférence, à l'arrière). Recréez la clé (mode DD ou Etcher). Dans le BIOS, vérifiez que le démarrage USB est autorisé (« USB Boot : Enabled »). |
| Message « Secure Boot violation » / « Image refusée ». | Ubuntu est normalement compatible Secure Boot. Si le message apparaît quand même : dans le BIOS, onglet *Security* ou *Boot*, mettez **Secure Boot sur Disabled**, enregistrez, puis réessayez. **[non vérifié sur source officielle]** |
| La clé n'apparaît qu'en mode « Legacy » ou le PC est très ancien. | Recréez la clé avec Rufus en **MBR** ; activez **CSM/Legacy** dans le BIOS. |
| L'installateur Ubuntu signale « Intel RST » / « RAID ». | Le tutoriel Ubuntu indique que la technologie Intel RST peut bloquer l'installation. Dans le BIOS, passez le mode SATA de **RAID/RST** à **AHCI**. ⚠️ Si vous gardez Windows, cela peut l'empêcher de démarrer. **[méthode exacte non vérifiée sur source officielle]** |
| Écran noir ou logo Ubuntu qui tourne sans fin (souvent avec une carte **NVIDIA** récente). | **Consigne officielle NOMAD** : redémarrez et choisissez **« Try or Install Ubuntu (safe graphics) »** dans le menu de démarrage de la clé. |
| Le PC redémarre sous Windows sans passer par la clé. | La touche n'a pas été appuyée assez tôt, ou le « Démarrage rapide » de Windows court-circuite le BIOS : utilisez la méthode 3.2. |

---

## 4. Installer Ubuntu (écran par écran)

Au démarrage de la clé apparaît un menu noir (GRUB) :

```
            GNU GRUB
 ┌──────────────────────────────────────────────┐
 │ *Try or Install Ubuntu                       │ ◀── Entrée (choix normal)
 │  Try or Install Ubuntu (safe graphics)       │ ◀── si écran noir / NVIDIA
 │  …                                           │
 └──────────────────────────────────────────────┘
```

Appuyez sur **Entrée** sur **« Try or Install Ubuntu »**. Après une minute environ, l'installateur graphique s'ouvre. Les libellés ci-dessous sont ceux de l'installateur en français ; la formulation exacte peut légèrement varier selon la version (l'équivalent anglais est entre parenthèses).

| # | Écran | Ce qu'il faut choisir |
|---|---|---|
| 1 | **Langue** (Language) | **Français**, puis Suivant |
| 2 | **Accessibilité** | Rien à changer, Suivant |
| 3 | **Disposition du clavier** (Keyboard layout) | **Français** → **Français (AZERTY)** ; pour la Belgique, **Belge** ; pour la Suisse, **Suisse romand** ; pour le Canada, **Français (Canada)**. Testez des lettres dans le champ de test (a, z, m, chiffres). |
| 4 | **Connexion Internet** | **Connexion câblée** si le câble est branché. Sinon, choisissez votre Wi-Fi et tapez sa clé. *Si aucun réseau Wi-Fi n'apparaît : branchez un câble, ou partagez la connexion d'un téléphone Android par câble USB (« Partage de connexion USB »).* |
| 5 | **Mise à jour de l'installateur** (si proposée) | **Mettre à jour maintenant**, puis l'installateur redémarre ; reprenez au début. |
| 6 | **Essayer ou installer Ubuntu** | **Installer Ubuntu** |
| 7 | **Type d'installation** | **Installation interactive** (Interactive installation) |
| 8 | **Applications** | **Sélection par défaut / Applications par défaut** (Default apps) |
| 9 | **Logiciels propriétaires / tiers** | ✅ **Cochez « Installer des logiciels tiers pour le matériel graphique et Wi-Fi »** (« Install third-party software for graphics and Wi-Fi hardware »). **Indispensable** si vous avez une carte NVIDIA ou une carte Wi-Fi exotique : l'installateur NOMAD **n'installe pas le pilote graphique**. Cochez aussi les formats multimédias si c'est proposé. |
| 10 | **Mot de passe Secure Boot** (n'apparaît **que** sur certains PC, quand Secure Boot est actif et qu'un pilote tiers doit être ajouté) | Choisissez un mot de passe simple de 8 caractères minimum, **notez-le** : il servira **une seule fois** au redémarrage (voir 4.1). **[non vérifié sur source officielle]** |
| 11 | **Type d'installation du disque** | **Effacer le disque et installer Ubuntu** (Erase disk and install Ubuntu). ⚠️ **Tout le disque est effacé.** Laissez « Fonctionnalités avancées » sur **Aucune** : le chiffrement est possible, mais il faudra taper un mot de passe à chaque démarrage, ce qui est gênant pour un serveur qui doit redémarrer seul. *Double démarrage : « Installer Ubuntu à côté de Windows »* (voir les avertissements de la partie 0). |
| 12 | **Alerte BitLocker** (si Windows est chiffré et que vous gardez Windows) | Revenez sous Windows, puis Paramètres → **Gérer BitLocker** → **Désactiver** ; attendez la fin du déchiffrement, puis relancez l'installation. |
| 13 | **Créer votre compte** | Votre nom ; **Nom de l'ordinateur** : par ex. `nomad` ; **Nom d'utilisateur** : par ex. `nomad` (minuscules, sans espace ni accent) ; **mot de passe** : **notez-le**, il servira pour toutes les commandes `sudo`. Option conseillée pour un serveur : **« Ouvrir la session automatiquement »** n'est pas nécessaire, car NOMAD démarre même sans session ouverte. Gardez **« Demander mon mot de passe »**. |
| 14 | **Fuseau horaire** | **Paris** (ou votre ville) |
| 15 | **Récapitulatif** | Vérifiez que le bon disque est indiqué, puis **Installer** |

L'installation dure 10 à 20 minutes. À la fin : **Redémarrer maintenant**. Quand l'écran demande « Please remove the installation medium, then press ENTER », **retirez la clé USB** et appuyez sur **Entrée**.

### 4.1 Écran bleu « Perform MOK management » au premier redémarrage

Cet écran n'apparaît que si vous avez défini un mot de passe Secure Boot à l'étape 10 **[procédure standard Ubuntu, non vérifiée sur source NOMAD]** :

```
┌──────── Perform MOK management ────────┐
│   Continue boot                        │
│ > Enroll MOK                           │ ◀── choisir
│   Enroll key from disk                 │
└────────────────────────────────────────┘
 Enroll MOK → Continue → Yes → [mot de passe de l'étape 10] → Reboot
```

Le clavier peut être en **QWERTY** sur cet écran. Si vous avez raté l'écran (10 secondes), le pilote NVIDIA ne se chargera pas ; voir le dépannage, partie 7.

### 4.2 Premier démarrage d'Ubuntu

1. Connectez-vous avec votre mot de passe.
2. L'écran de bienvenue s'affiche : cliquez sur **Suivant**, puis **ignorez Ubuntu Pro** (« Skip for now ») et **refusez le partage de données**, comme le conseille le guide NOMAD.
3. **Ouvrir le Terminal** : appuyez sur **Ctrl + Alt + T**, ou cliquez sur l'icône à 9 points en bas à gauche et tapez « Terminal ».

```
┌──────────────────── nomad@nomad: ~ ────────────────────┐
│ nomad@nomad:~$ █                                       │ ◀── c'est ici qu'on tape
│                                                        │     les commandes
└────────────────────────────────────────────────────────┘
```

**Règles du terminal pour débutants :**
- Le `$` en début de ligne n'est **pas à taper** : il indique seulement que le terminal attend une commande.
- **Coller** dans le terminal : **Ctrl + Maj + V** (et non Ctrl + V), ou clic droit puis **Coller**.
- Quand `sudo` demande `[sudo] password for nomad:`, tapez votre mot de passe : **rien ne s'affiche, c'est normal**. Appuyez ensuite sur **Entrée**.
- Attendez que la ligne `nomad@nomad:~$` réapparaisse avant de taper la commande suivante.

4. **Mettez Ubuntu à jour** (commande officielle du guide NOMAD) : tapez puis appuyez sur **Entrée**
```bash
sudo apt update && sudo apt upgrade -y
```
Comptez quelques minutes. Si Ubuntu le propose ensuite, redémarrez.

5. **(Facultatif mais conseillé) Activer SSH**, pour piloter le serveur à distance depuis un autre PC (commande officielle du guide NOMAD) :
```bash
sudo apt install openssh-server -y && sudo systemctl enable --now ssh
```
Ensuite, depuis un autre PC (PowerShell sous Windows ou Terminal sous Mac) : `ssh nomad@ADRESSE_IP` (l'adresse IP est expliquée à la partie 6.1).

6. **Empêcher la mise en veille** (sinon le serveur devient inaccessible) **[non vérifié sur source officielle NOMAD]** : **Paramètres**, puis **Alimentation** (ou « Énergie »), puis **Mise en veille automatique : Désactivée**, et « Écran vide » sur **Jamais** si vous le souhaitez. Sur un portable, vérifiez aussi le comportement à la fermeture du capot.

---

## 5. Installer Project NOMAD

Toujours dans le **Terminal** du PC Ubuntu, avec Internet connecté.

### 5.1 La commande à taper

> 🇫🇷 Ces commandes installent la **version française** (dépôt `Ti-guigui/project-nomad`). Si vous voyez ailleurs une commande contenant `Crosstalk-Solutions`, elle installe la version d'origine **en anglais** : n'utilisez pas celle-là.

**Commande complète (tout en une fois)**, à copier-coller en entier puis Entrée :
```bash
sudo apt-get update && \
sudo apt-get install -y curl && \
curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/refs/heads/main/install/install_nomad.sh \
  -o install_nomad.sh && \
sudo bash install_nomad.sh
```

**Ou la même chose en 3 commandes séparées** (plus facile à suivre). Tapez chaque ligne puis **Entrée** :
```bash
sudo apt install curl -y
```
```bash
curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/main/install/install_nomad.sh -o install_nomad.sh
```
```bash
sudo bash install_nomad.sh
```

### 5.2 Ce que vous allez voir et ce qu'il faut répondre

Ces messages viennent directement du script `install_nomad.sh`. Ils restent **en anglais** (c'est le script d'origine, seules les adresses de téléchargement changent) :

```
#########################################################################
                 [ logo PROJECT N.O.M.A.D. ]
                 Offline knowledge and education server
#########################################################################
# User has sudo permissions.
# This script is running in bash.
# This script is running on a Debian-based system.
# Architecture check passed (x86_64).

# This script will install Project NOMAD and its dependencies on your machine.
Are you sure you want to continue? (y/N):  y      ◀── tapez y puis Entrée

License Agreement & Terms of Use
… Apache License 2.0 …
I have read and accept License Agreement & Terms of Use (y/N)?  y   ◀── tapez y puis Entrée

# Docker not found. Installing Docker...           ◀── automatique, quelques minutes
# Docker installation completed.
# Checking for NVIDIA GPU...                       ◀── installe le « NVIDIA Container Toolkit » si besoin
# Downloading helper scripts...
# Downloading docker-compose file for management...
# Starting management containers using docker compose...
# Management containers started successfully.

GPU Setup Verification
===========================================
✓ NVIDIA GPU detected … / ○ No NVIDIA GPU detected   ◀── informatif seulement
# GPU acceleration not detected. The AI Assistant will run in CPU-only mode.   (si pas de GPU)

# Project NOMAD installation completed successfully!
# Installation files are located at /opt/project-nomad
# You can now access the management interface at http://localhost:8080 or http://192.168.1.42:8080
# Thank you for supporting Project NOMAD!
```

- Les deux seules questions sont les deux **`y`** (yes). Si vous appuyez sur Entrée sans rien taper, la réponse est **N** et l'installation s'arrête ; relancez alors `sudo bash install_nomad.sh`.
- **Notez l'adresse `http://192.168.x.x:8080`** affichée à la fin : c'est celle à taper sur les autres appareils.
- Durée : « environ une minute » selon le site officiel, plus le temps de téléchargement de Docker.
- NOMAD est installé dans **`/opt/project-nomad`** et **redémarre automatiquement** à chaque démarrage du PC.

---

## 6. Utiliser Project NOMAD

### 6.1 Sur le PC lui-même

Ouvrez **Firefox** (dans la barre de gauche d'Ubuntu) et tapez dans la **barre d'adresse** (en haut, pas dans la zone de recherche Google) :
```
http://localhost:8080
```
Le **Centre de commande** (tableau de bord de NOMAD, en français) s'affiche.

### 6.2 Première configuration : l'« Assistant de configuration »

Au premier lancement, cliquez sur la tuile **Assistant de configuration** (adresse directe : `http://localhost:8080/easy-setup`). Il comporte 4 à 6 étapes selon vos choix :

```
┌──────────────── Assistant de configuration ─────────────────┐
│ [1 Applications]→[2 Cartes]→[3 Contenus]→[IA]→[Récapitulatif]│
│ ███████████░░░░░░░  Stockage : 120 Go / 930 Go               │ ◀── barre de stockage
│ ☑ Bibliothèque d'information (Wikipédia, médecine…)          │
│ ☑ Plateforme éducative (Khan Academy)                        │
│ ☐ Assistant IA (IA locale)                                   │
│                                              [ Suivant ]     │
└──────────────────────────────────────────────────────────────┘
```
*(Schéma indicatif.)*

1. **Applications** : cochez ce que vous voulez (bibliothèque, éducation, IA…). **L'IA est facultative.** Si vous cochez l'Assistant IA, une étape **IA** s'ajoute pour choisir les modèles.
2. **Cartes** : des collections prêtes à l'emploi pour la France :
   - **France – Nord & Île-de-France**, **France – Ouest**, **France – Sud-Ouest**, **France – Centre-Est**, **France – Sud-Est & Corse** ;
   - **Outre-mer – Antilles & Guyane**, **Outre-mer – Océan Indien**, **Outre-mer – Pacifique**.

   Il existe aussi un **sélecteur de pays**. Comptez quelques Go par région.
3. **Contenus** :
   - **Wikipédia en français**, au choix : *Référence rapide* (136 Mo), *Articles populaires* (1,3 Go), *Wikipédia complète (compacte)* (3,4 Go), *Wikipédia complète (sans images)* (12 Go) ou *Wikipédia complète (intégrale)* (53 Go) ;
   - des collections thématiques : **France & Outre-mer**, **Médecine & Secours**, **Survie & Préparation**, éducation… Chacune a trois niveaux : **Essentiel** (petit), **Standard**, **Complet**.

   **Surveillez la barre de stockage.**
4. **Récapitulatif**, puis **Terminer la configuration**. Les téléchargements démarrent : cela peut prendre **des heures**, laissez le PC allumé (la nuit si besoin).

> 💡 Pour commencer petit : Wikipédia *Référence rapide*, les collections *Essentiel*, une région de carte et éventuellement un petit modèle d'IA. Cela tient en quelques Go.

### 6.3 Trouver l'adresse IP du serveur

Trois méthodes :
- **Lire la dernière ligne de l'installateur** (`http://192.168.x.x:8080`).
- Dans le Terminal :
  ```bash
  hostname -I
  ```
  Le **premier nombre** affiché (par ex. `192.168.1.42`) est l'adresse IP. C'est exactement la commande que le script d'installation utilise.
- Ou dans **Paramètres → Réseau** (ou **Wi-Fi**) → icône ⚙ de la connexion → « Adresse IPv4 ».

### 6.4 Depuis un autre ordinateur, un téléphone ou une tablette

1. L'appareil doit être **sur le même réseau** (même box ou même Wi-Fi) que le serveur. **Aucune application à installer, pas besoin d'Internet** une fois le contenu téléchargé.
2. Ouvrez un navigateur (Chrome, Firefox, Safari, Edge) et tapez **dans la barre d'adresse** :
   ```
   http://192.168.1.42:8080
   ```
   (remplacez par **votre** adresse IP). Tapez bien `http://` et **non** `https://`, sans oublier `:8080`.
3. Astuce : **ajoutez la page aux favoris**, ou sur téléphone, « Ajouter à l'écran d'accueil ».

Ports utilisés par NOMAD (relevés dans le code officiel). Les tuiles du Centre de commande y mènent automatiquement ; vous n'avez normalement pas à les taper :

| Service | Adresse |
|---|---|
| Centre de commande (tableau de bord) | `http://IP:8080` |
| Discussion avec l'IA / Base de connaissances | `http://IP:8080/chat` |
| Cartes | `http://IP:8080/maps` |
| Bibliothèque (Kiwix / Wikipédia) | `http://IP:8090` |
| Outils de données (CyberChef) | `http://IP:8100` |
| Notes (FlatNotes) | `http://IP:8200` |
| Éducation (Kolibri, nouvelle génération) | `http://IP:8310` |
| Journaux techniques (Dozzle, utile au dépannage) | `http://IP:9999` |
| Documentation intégrée | `http://IP:8080/docs/home` |

### 6.5 Garder toujours la même adresse IP (fortement conseillé)

La box peut attribuer une autre IP au serveur après une coupure. Dans ce cas, l'ancien favori ne marche plus, et le script d'installation a **inscrit l'IP détectée** dans la configuration (`URL=http://IP:8080`).

Solution : dans l'interface de votre box (souvent `http://192.168.1.1`, `http://192.168.0.1` ou l'application de l'opérateur), cherchez **« Bail DHCP statique »**, **« Réservation d'adresse IP »** ou **« IP fixe »**, puis associez l'adresse IP actuelle au PC « nomad » **[menus spécifiques à chaque box, non vérifiés]**.

### 6.6 Ajouter du contenu plus tard

Tout se trouve dans le menu **Paramètres** du Centre de commande :

| Je veux… | Où aller |
|---|---|
| Plus de Wikipédia / d'autres livres ZIM (Wikivoyage, Wiktionnaire, Vikidia…) | **Paramètres → Explorateur de contenus** (`/settings/zim/remote-explorer`) |
| Plus de cartes | **Paramètres → Gestionnaire de cartes** (`/settings/maps`) |
| Des modèles d'IA | **Paramètres → Assistant IA** (`/settings/models`) ; l'IA doit d'abord être installée depuis le **Dépôt d'applications** (`/supply-depot`) |
| D'autres applications (PDF, explorateur de fichiers, bibliothèque e-book…) | **Dépôt d'applications** |
| Des cours Khan Academy supplémentaires | Ouvrez **Kolibri**, connectez-vous en admin, puis **Device → Channels** |
| Interroger l'IA sur vos propres PDF | **Base de connaissances** (dans la discussion avec l'IA) : envoyez vos documents |
| Mettre à jour NOMAD | **Paramètres → Rechercher des mises à jour** (les mises à jour automatiques se règlent sur la même page et sont désactivées par défaut) |
| Tester les performances | **Paramètres → Banc d'essai** |

> ⚠️ **Avant de passer hors ligne** (conseil officiel) : faites toutes les mises à jour, téléchargez tout ce dont vous aurez besoin, et **testez chaque fonction tant que vous avez Internet** pour pouvoir dépanner.

### 6.7 Arrêter, redémarrer, mettre à jour, désinstaller (en ligne de commande)

Scripts officiels, situés dans `/opt/project-nomad` :
```bash
sudo bash /opt/project-nomad/start_nomad.sh     # démarrer tous les services
sudo bash /opt/project-nomad/stop_nomad.sh      # arrêter tous les services
sudo bash /opt/project-nomad/update_nomad.sh    # mettre à jour le Centre de commande (pas les applis)
```
Désinstallation (⚠️ **irréversible, efface toutes les données NOMAD**) :
```bash
curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/refs/heads/main/install/uninstall_nomad.sh -o uninstall_nomad.sh && sudo bash uninstall_nomad.sh
```
Pour éteindre proprement le serveur : menu en haut à droite d'Ubuntu, puis **Éteindre**, ou `sudo poweroff`.

### 6.8 Installer NOMAD sur plusieurs PC

Réutilisez **la même clé USB** et refaites les parties 3 à 6 sur chaque PC. Un seul serveur suffit en général pour toute la maison, puisque tous les appareils s'y connectent par le navigateur.

---

## 7. Dépannage

### Installation de NOMAD

| Problème | Cause / Solution |
|---|---|
| `curl: command not found` | Tapez d'abord `sudo apt install curl -y`. |
| `This script requires sudo permissions…` | Vous avez oublié `sudo` : `sudo bash install_nomad.sh` |
| `This script requires bash…` | Vous avez lancé `sh install_nomad.sh` : utilisez **`bash`**. |
| `This script is designed to run on Debian-based systems only` | Vous n'êtes pas sur Ubuntu/Debian. |
| `WARNING: Detected architecture 'aarch64'…` | PC ARM (Raspberry Pi, Mac Apple Silicon…) : non pris en charge. Faites Ctrl+C pour annuler. |
| `Could not resolve host` / téléchargements qui échouent | Pas d'Internet. Testez avec `ping -c 3 github.com` ; branchez un câble Ethernet. |
| `Could not get lock /var/lib/dpkg/lock…` | Ubuntu installe des mises à jour en arrière-plan : attendez 5 à 10 minutes puis relancez. **[non vérifié sur source officielle]** |
| `Failed to start management containers` | Relancez `sudo bash install_nomad.sh`. Vérifiez l'espace disque libre avec `df -h /`. Consultez les journaux sur `http://IP:9999` ou avec `sudo docker ps -a`. |
| Vous relancez l'installateur sur un NOMAD déjà installé. | ⚠️ Le script prévient qu'il **peut écraser la configuration** existante. Sauvegardez `/opt/project-nomad` avant. |

### Accès depuis le navigateur

| Problème | Solution |
|---|---|
| `localhost:8080` ne répond pas sur le serveur. | Attendez 1 à 2 minutes après un démarrage. Puis lancez `sudo bash /opt/project-nomad/start_nomad.sh`. Pour vérifier : `sudo docker ps` doit lister `nomad_admin`, `nomad_mysql`, `nomad_redis`… |
| Ça marche sur le serveur mais **pas depuis le téléphone ou l'autre PC**. | 1) Vérifiez que l'appareil est sur le **même réseau** : le **Wi-Fi invité** de la box et l'**« isolation des clients / AP isolation »** empêchent les appareils de se voir. 2) Les **données mobiles (4G/5G)** ne marchent pas : passez sur le Wi-Fi de la maison. 3) L'IP a changé : refaites `hostname -I` (voir 6.5). 4) Tapez `http://` et non `https://`, avec `:8080`. 5) Pare-feu : sur Ubuntu Desktop, le pare-feu `ufw` est **désactivé par défaut**. Si vous l'avez activé : `sudo ufw allow 8080/tcp` (et les autres ports de la partie 6.4) **[non vérifié sur source officielle]**. 6) Un pare-feu ou antivirus **sur l'appareil client** (réseau Windows réglé en « Public ») peut aussi bloquer. |
| Le serveur devient injoignable au bout d'un moment. | Mise en veille : voir 4.2, étape 6. |
| Page blanche / « Service unavailable » sur un service. | FAQ officielle : attendez 30 s à 2 min, actualisez avec Ctrl+R, sinon **Dépôt d'applications → Arrêter puis Démarrer** le service. |
| `Failed to load the XML library file '/data/kiwix-library.xml'` | FAQ officielle : **Dépôt d'applications → arrêtez « Bibliothèque d'information »**, attendez 10 à 15 s, redémarrez-la ; sinon **Forcer la réinstallation**. |
| Cartes grises ou vides. | Aucune carte téléchargée : **Paramètres → Gestionnaire de cartes**, téléchargez une région puis actualisez. |
| Téléchargements bloqués. | Vérifiez Internet et l'espace disque (**Paramètres → Système**) ; annulez puis relancez le téléchargement. |

### Wi-Fi et pilotes

| Problème | Solution |
|---|---|
| Pas de Wi-Fi après l'installation d'Ubuntu. | Branchez un câble Ethernet (ou le partage de connexion USB d'un téléphone), puis ouvrez **Logiciels et mises à jour → Pilotes additionnels** et choisissez le pilote proposé, ou tapez `sudo ubuntu-drivers install`, puis redémarrez **[commande Ubuntu standard, non vérifiée sur source NOMAD]**. Pour un serveur, **l'Ethernet reste conseillé**. |
| Vous voulez un NOMAD « portable » accessible sans box. | Vidéo officielle sur un routeur de voyage Wi-Fi : https://www.youtube.com/watch?v=BNXpXPYV-5A |

### Carte graphique et IA

| Problème | Solution (documentation officielle) |
|---|---|
| L'IA est très lente. | Normal sans carte graphique (10 à 15 tokens/s en processeur seul, contre 100 et plus avec un GPU). Choisissez un modèle plus petit et fermez les autres programmes. |
| Carte NVIDIA présente, mais l'installateur indique « CPU-only ». | Le **pilote NVIDIA** n'est pas installé (l'installateur NOMAD ne l'installe pas). Installez-le avec **Pilotes additionnels** ou `sudo ubuntu-drivers install`, redémarrez, vérifiez avec `nvidia-smi`, puis **Dépôt d'applications → Assistant IA → Forcer la réinstallation**. Si l'installateur l'a suggéré : `sudo systemctl restart docker`. |
| Pilote NVIDIA installé mais `nvidia-smi` échoue, avec Secure Boot actif. | L'écran MOK (4.1) a été manqué. Le plus simple : **désactivez Secure Boot** dans le BIOS **[non vérifié sur source officielle]**. |
| Bandeau « Carte graphique inaccessible pour Assistant IA ». | Bouton **« Corriger : réinstaller Assistant IA »** (les modèles téléchargés sont conservés). |
| Carte AMD Radeon. | L'installateur la détecte ; l'accélération ROCm se configure **automatiquement à l'installation de l'Assistant IA**. |
| Carte graphique ajoutée après l'installation. | Installez le pilote, puis **Forcer la réinstallation** de l'Assistant IA. |

### Aide

- Problème lié à la version française (traduction, cartes de France, contenus francophones) : https://github.com/Ti-guigui/project-nomad/issues
- Problème du logiciel lui-même (projet d'origine, en anglais) : https://github.com/Crosstalk-Solutions/project-nomad/issues
- Discord Crosstalk Solutions, salon **#project-nomad** : https://discord.com/invite/crosstalksolutions
- Documentation intégrée à NOMAD : `http://IP:8080/docs/home`

---

## Récapitulatif express (aide-mémoire)

```
1. Télécharger Ubuntu 26.04 LTS amd64 → ubuntu.com/download/desktop
2. Clé 16 Go → Rufus (GPT, mode ISO) ou balenaEtcher
3. PC cible : touche Boot Menu (F12/F11/F9/Échap…) → « UEFI: clé USB »
4. « Try or Install Ubuntu » → Interactive → Default apps → ☑ pilotes tiers
   → Effacer le disque → compte → Installer → retirer la clé
5. Terminal (Ctrl+Alt+T) :
     sudo apt update && sudo apt upgrade -y
     sudo apt install curl -y
     curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/main/install/install_nomad.sh -o install_nomad.sh
     sudo bash install_nomad.sh        → répondre y, puis y
6. Navigateur : http://localhost:8080  → Assistant de configuration
7. Autres appareils : hostname -I → http://ADRESSE_IP:8080
```

---

## Sources consultées

Le guide a été rédigé à partir du projet d'origine, puis adapté à la version française (`Ti-guigui/project-nomad`, qui reprend les mêmes scripts avec ses propres adresses de téléchargement).


- https://github.com/Crosstalk-Solutions/project-nomad (README : installation, prérequis, scripts, sécurité)
- https://raw.githubusercontent.com/Ti-guigui/project-nomad/refs/heads/main/install/install_nomad.sh (lu en entier : questions, messages, Docker, NVIDIA/AMD, `hostname -I`)
- https://raw.githubusercontent.com/Crosstalk-Solutions/project-nomad/refs/heads/main/install/management_compose.yaml (ports 8080 et 9999, URL)
- Dépôt officiel : `admin/database/seeders/service_seeder.ts` (ports des services), `admin/start/routes.ts` (pages /easy-setup, /settings/…), `collections/maps.json`, `admin/app/services/countries_service.ts` (cartes par pays)
- https://github.com/Crosstalk-Solutions/project-nomad/blob/main/admin/docs/faq.md et `admin/docs/getting-started.md` (FAQ et dépannage intégrés)
- https://github.com/Crosstalk-Solutions/project-nomad/blob/main/FAQ.md
- https://www.projectnomad.us/install (guide officiel pas à pas)
- https://www.projectnomad.us/faq ; https://www.projectnomad.us/guides (vidéos)
- https://www.youtube.com/watch?v=Ab5EbJmf7xE (vidéo officielle d'installation) ; https://www.youtube.com/watch?v=BNXpXPYV-5A (accès Wi-Fi)
- https://www.projectnomad.us/install/wsl2 (référencé, non détaillé)
- https://ubuntu.com/download/desktop (26.04.1 LTS amd64 disponible)
- https://ubuntu.com/tutorials/install-ubuntu-desktop (écrans de l'installateur, clé de 12 Go ou plus, touches F12/Échap/F2/F10, BitLocker, Intel RST)
- https://ubuntu.com/tutorials/create-a-usb-stick-on-windows (Rufus : « Write in ISO Image mode »)
- https://rufus.ie/fr/ (Rufus 4.15) ; https://etcher.balena.io/
- Recherche : emelia.io, mintlify.wiki, hexmos.com (pour confirmer l'identité du projet uniquement)

