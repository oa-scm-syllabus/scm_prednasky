---
#== Layout
theme: default
background: https://cover.sli.dev # https://unsplash.com/collections/94734566/slidev
transition: slide-left #https://sli.dev/guide/animations#slide-transitions
mdc: true # https://sli.dev/guide/syntax#mdc-syntax
selectable: false
codeCopy: false
download: true
hideInToc: true

#== Code Highlighter
highlighter: shiki
lineNumbers: true

#== Dravings https://sli.dev/guide/drawing
drawings:
  persist: false

#== Export Configuration
# use export CLI options in camelCase format https://sli.dev/guide/exporting.html
export:
  format: pdf
  timeout: 30000
  dark: false
  withClicks: false

#== Slide Info
src: '../../pages/index.md'
title: "Source control management"
exportFilename: "20_git_uvod_do_git"
titleTemplate: "SCM %s by Adam Fišer"
info: |
  ## PVA2 Programování a vývoj aplikací

  Určeno pouze pro výukové účely

  [Repository](https://github.com/oa-scm-syllabus/scm_prednasky) / [Prezentace](https://oa-scm-syllabus.github.io/scm/)

  Created by [Adam Fišer](https://github.com/AdamFiser)
---
layout: default
---

#  Obsah

<Toc :columns="2" minDepth="1" maxDepth="1"></Toc>
---

# Bez SCM

- Změny se ukládají ručně
- Špatná orientace adresáře s projektem
- Není organizace
- Není historie změn
- Není možné se vrátit k předchozí verzi
- Není možné spolupracovat na projektu
- Není možné vytvářet větve

<div class="absolute right-30px top-90px max-w-90">
  <img src="/struktura_bez_git.png"/>
</div>


---
layout: cover
background: https://cover.sli.dev
---

# git

---

# Co je git

> git je distribuovaný systém řízení verzí

Řízení verzí je systém, který zaznamenává změny v souboru nebo sadě souborů a pomáhá nám v případě potřeby později vyvolat konkrétní verze. Příklady SCM: GIT, Subversion (SVN), CVS a mnoho dalších

- Řízení verzí nám umožňuje:
  - sledovat změny v kódu
  - spolupráci na projektech
  - ukládat historii změn
  - vrátit se k předchozím verzím
  - vytvářet větve

---

# Jak se pracuje s git


- GIT je původně aplikací pro příkazový řádek
- Pro zjednodušení ovládání existují GUI aplikace nebo lépe, přímá integrace do IDE




--- 

# Základy práce s git

- Repozitáře
- Přidání souborů
- Commit
- Vytvoření větve
- Merge
- Pull
- Push
- Fetch

---

# Repository

- Základem práce jsou repository (repozitář, repo)
- Repozitář je místo, kde je uložen váš projekt a jeho historie změn.
- Členíme je dle místa uložení na centrální vzdálený a lokální.
- Centrální – všichni spolupracovníci 
- Lokální – vaše privátní kopie centrálního repozitáře. Nad lokálním repo provádíte změny.

---

# Repository

- Pokud plánuji používat Git na projektu sám a pouze na jednom stroji, je možné vytvořit si pouze lokální repository. V tu chvíli stačí Git zprovoznit pouze na daném stroji a vše potřebné je připraveno. **Pozor na zálohy!**

- Bude-li na projektu pracovat více lidí nebo jej chci mít dostupný na více strojích, je nutné vytvořit vzdálené repository. Na výběr jsou dvě možnosti:
  - vlastní server, na kterém si zprovozníme repository
  - služba nabízející hostování repository (Github)

---

# `add` - Přidání souborů

```bash
git add <soubor>
```

- Přidání souborů do repozitáře se provádí pomocí příkazu `add`.
- Příkaz `add` přidá soubor do tzv. stage. Stage je místo, kde se nachází soubory, které budou součástí následujícího commitu.
- Lze použít pro jednotlivé soubory nebo pro celé adresáře.
- Je nutné provést před `commitem`. Pokud soubor nebo adresář nebyl přidán do stage, nebude součástí commitu.

---

# `commit` - Záznam změn

```bash
git commit -m "Zpráva"
```

- Commit je záznam o změně v projektu. Každý commit obsahuje zprávu, která popisuje, co bylo změněno.
- Commit si představte jako souhrn jednoho bloku práce, která spolu souvisí. Například jedna nová funkce.
- Tzn. budeme-li měnit obsah čtyř souborů v rámci jedné změny, zahrneme všechny čtyři soubory do jednoho commitu.

---

# `commit`

- Budeme-li v budoucnu chtít úpravy zrušit, vrátíme celý commit a všechny úpravy commitu se vrátí zpět.
- Je zvykem provádět commit nad funkčním a otestovaným kódem.
- Součástí commitu je zpráva, která pomůže identifikovat obsah změn. Obecný popis, identifikace issue atd.
- Commit nenahrazuje uložení změny souboru.

---

# `push` - Odeslání změn

```bash
git push
```


- `commit` máme vytvořen, ale je pouze v lokálním repo. Je nutné jej nahrát na centrální repozitář.
- Důležitou akcí při práci s GITem je tzv. push. Pushem odešleme naše commity, tedy provedené změny, do vzdáleného GIT repozitáře, kde je od této chvíle vidí všichni a mohou s úpravami dále pracovat.
- Každý commit musí být v nějaké větvi. Standardně se hlavní větev jmenuje master.
- Je vhodné commit ihned nahrát `push` na vzdálený repo. Nahráním zpřístupníte svůj commit ostatním vývojářům. Ti si jej mohou ihned stáhnout a navázat na Váš kód.

---

# `pull` - Stáhnutí změn
    
```bash
git pull
```

- `pull` je opakem `push`. Stáhne změny z vzdáleného repozitáře a sloučí je s Vaším lokálním repozitářem.
- Pokud se změny vzdáleného repozitáře neshodují s Vaším lokálním repozitářem, dojde ke sloučení anebo může dojít ke konfliktu. O konfliktech později.
- `pull` je vhodné provádět pokaždé, před začátkem práce, abychom vždy pracovali na aktuální verzi projektu.

<!--
Obě akce push a pull se provádějí vždy vzhledem k aktuální větvi, ve které se nacházíme. Pokud tedy pracujeme ve vlastní větvi „dev“ a provedeme push, odešleme tak pouze commity v rámci větve „dev“. Naopak pokud provedeme pull ve větvi „dev“, aktualizuje se nám pouze tato větev, nikoliv další větve, jako například master apod.
-->

---

# `fetch` - Stáhnutí změn

```bash
git fetch
```

- `fetch` je podobné jako `pull`, ale neprovádí automatické sloučení změn.
- Stáhne změny z vzdáleného repozitáře, ale **neaplikuje** je na Vaši lokální větev.
- Tímto způsobem můžete zjistit, co se změnilo v repozitáři, ale nebudete mít změny ve Vašem kódu.
- `fetch` je vhodné provádět před `pull`, abyste měli přehled o změnách, které se chystáte stáhnout.


---
layout: cover
background: https://cover.sli.dev
---

# Git
<img src="/git_logo.jpg" />

---

# Instalace `git`

- Stáhnout a nainstalovat GIT https://git-scm.com
- Při instalaci není nutné měnit žádné předvolby
- Po instalaci je nutné nastavit jméno a email

```bash
# Nastaví jméno, které má být připojeno k transakcím odevzdání.  
git config --global user.name "Jméno Příjmení"

# Nastaví e-mail, který má být připojen k transakcím odevzdání.
git config --global user.email "skolniEmail@oa-opava.cz"
  
# Volitelně
# Povolí užitečné obarvení výstupu příkazového řádku
git config --global color.ui auto

# Kontrola nastavení
git config -l
```

---
layout: cover
background: https://cover.sli.dev
---

# GitHub
<img src="/github_logo.png" />

---

# Registrace GitHub

## 1. Registrace pokud ještě nemáme účet
- Vytvořit registraci na GitHub.com - https://www.GitHub.com
- Uživatelské jméno ve tvaru `JmenoPrijmeni` nebo `JmenoPrijmeniPrezdivka`
- Primární emailová adresa – školní/pracovní (ověřuje se vůči OA Enterprise)
- Nutná 2FA autentizace

Po registraci:
- Nastavit sekundární email – soukromý – neztratíte přístup po opuštění organizace
- Nastavte profil – Billing informace, fotografie, bio,..

---

# Registrace GitHub

## 2. Získání výhod GitHub Education Pack

- **https://education.github.com/pack**
- Při registraci povolit ověření polohy
- Dokládá se fotka ISIC karty




---

# Chcete se o git dozvědět více?

- **https://skills.github.com/**
- https://git-scm.com/book/cs/v2 - kniha o GITu
- https://githubtraining.github.io/training-manual
- https://docs.github.com/en/get-started/quickstart/hello-world 
- https://training.github.com/downloads/github-git-cheat-sheet/
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet 
- https://edav.info/github.html 
- https://docs.microsoft.com/cs-cz/training/modules/introduction-to-github-visual-studio-code/


---
src: '../../pages/thanku.md'
---