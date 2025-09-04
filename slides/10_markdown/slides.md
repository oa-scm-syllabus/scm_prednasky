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
title: &title "10 Markdown syntaxe"
exportFilename: "10_markdown"
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

# Úvod

- GitHub Markdown je lehký značkovací jazyk
- Používá se pro formátování textu v GitHub repozitářích
- Podporuje různé formátovací prvky
- Jednoduché a snadno čitelné
- Zpravidla se používá pro README soubory a dokumentaci
- Přípona souborů `.md`

## Zdroje
- [GitHub.com: Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)


---
layout: two-cols-header
---

# Nadpisy

- Odstavec textu začíná na novém řádku.
- Oddělení odstavců se provádí prázdným řádkem.
- Nadpisy se používají pro strukturování obsahu
- Úroveň nadpisu určuje znak `#`



::left::
## Syntaxe
```md
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

::right::
## Náhled:
# H1
## H2
### H3
#### H4
##### H5
###### H6

---
layout: default
---

# Odstavce

- Odstavec textu začíná na novém řádku.
- Oddělení odstavců se provádí prázdným řádkem.


### Syntaxe
```markdown
První řádek dlouhého textu.
Druhý řádek odstavce.

Třetí řádek kódu, první řádek druhého odstavce.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis vehicula elementum. Morbi porta molestie lorem, vitae congue augue semper sit amet. Praesent malesuada facilisis imperdiet. 
```

### Náhled
První řádek dlouhého textu.
Druhý řádek odstavce

Třetí řádek kódu, první řádek druhého odstavce.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis vehicula elementum. Morbi porta molestie lorem, vitae congue augue semper sit amet. Praesent malesuada facilisis imperdiet. 


---
layout: two-cols-header
---
# Formátování textu

- Tučný text: `**text**` nebo `__text__`
- Kurzíva: `*text*` nebo `_text_`
- Tučná kurzíva: `***text***` nebo `___text___`
- Přeškrtnutý text: `~~text~~`

::left::

## Syntaxe
```markdown
**Tučný text**
*Kurzíva*
***Tučná kurzíva***
~~Přeškrtnutý text~~
```
::right::
## Náhled:
- **Tučný text**
- *Kurzíva*
- ~~Přeškrtnutý text~~

---
layout: cover
background: 'https://cover.sli.dev'
---
# Seznamy

---
layout: two-cols-header
---
# Nečíslované seznamy
- Syntax: `-`, `*`, nebo `+`
- Podřízená položka je odsazena


::left::
## Syntaxe:
```md
- Nečíslovaný seznam:
  - Položka 1
  - Položka 2
```

::right::
## Náhled:
- Nečíslovaný seznam:
  - Položka 1
  - Položka 2

---
layout: two-cols-header
---
# Číslované seznamy
::left::
## Syntaxe
```md
1. První položka
2. Druhá položka
    1. Podpoložka
3. Třetí položka
```
::right::
## Náhled:
1. První položka
2. Druhá položka
    1. Podpoložka
3. Třetí položka

---
layout: cover
background: 'https://cover.sli.dev'
---
# Zdrojový kód

---
layout: default
---
# Zdrojový kód
- Píše se pomocí symbolu ` (backtick)

<v-click>

## Jak napsat backtick
- QWERTY US klávesnice: <kbd>`</kbd> (vedle klávesy 1)
- QWERTZ CZ klávesnice: <kbd>AltGr</kbd> + <kbd>7</kbd>
- Alternativně podržet <kbd>Alt</kbd> + <kbd>096</kbd>

</v-click>

<v-click>

## Použití v textu
- Inline kód: `` `kód` ``

</v-click>
---
layout: default
---
# Bloky kódu

- Blok kódu:
  ````md
  ```
  kód
  ```
  ````
<v-click>

- Blok kódu s podporou syntax higlihtingu:
  ````python
  ```python
  print("Hello world")
  ```
  ````
  
</v-click>

<v-click>
- Specialita: Zobrazení bloku kódu v md syntaxi (tzn. předchozí blok)
  ````md
  ````md
  ```python
  print("Hello world")
  ``` 
</v-click>
---
layout: default
---
# Obrázky

- Inline obrázek: `![alt text](url)`
- Reference obrázek:
  ```md
  ![alt text][label]
  [label]: url
  ```
## Syntaxe
```md
- Inline obrázek: ![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
- Reference obrázek:
  ![GitHub Logo][2]
  [2]: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
```


---
layout: two-cols-header
---
# Odkazy
::left::
## Syntaxe:
```md
- Inline odkaz: [GitHub](https://github.com)
- Reference odkaz:
  [GitHub][1]  
  [1]: https://github.com
```
::right::
## Náhled:
- Inline odkaz: [GitHub](https://github.com)
- Reference odkaz:
  [GitHub][1]
  [1]: https://github.com

---
layout: default
---
# Tabulky
- Svislítko `|` <kbd>AltGr</kbd> + <kbd>w</kbd>odděluje buňky
- První řádek obsahuje hlavičky
- Druhý řádek odděluje hlavičky od obsahu
- Dále následují řádky s daty

## Syntaxe
  ```md
  | Hlavička 1 | Hlavička 2 |
  |------------|------------|
  | Řádek 1    | Data 1     |
  | Řádek 2    | Data 2     |
  ```

## Náhled
| Hlavička 1 | Hlavička 2 |
|------------|------------|
| Řádek 1    | Data 1     |
| Řádek 2    | Data 2     |

---
layout: two-cols-header
---
# Další prvky


::left::
## Syntaxe
- Horizontální čára: `---`
- Check boxy:
  ```md
  [ ] Nezaškrtnuté
  [x] Zaškrtnuté
  ```
- Citace:
  ```md
    > Toto je citace
  ```

::right::
## Ukázka:
- Check boxy:
  - [ ] Nezaškrtnuté
  - [x] Zaškrtnuté
- Citace:
  > Toto je citace

---
layout: cover
background: 'https://cover.sli.dev'
---
# Úkoly pro procvičení GitHub Markdown
---
layout: default
---
## Úkol 1: Nadpisy a Formátování Textu
1. Zvolte si libovolné téma ze světa IT.
2. Vytvořte nový soubor `it_markdown_practice.md`.
2. Použijte různé úrovně nadpisů (H1 až H6) pro strukturování obsahu.
3. Na začátek souboru přidejte nadpis H1.
4. Přidejte několik odstavců textu a použijte následující formátování:
   - **Tučný text** pro zvýraznění klíčových událostí.
   - *Kurzíva* pro zvýraznění důležitých termínů.
   - ~~Přeškrtnutý text~~ pro označení zastaralých technologií, neplatných výrazů.
---
layout: default
---
## Úkol 2: Seznamy
1. V tomtéž souboru `it_markdown_practice.md` vytvořte nečíslovaný seznam s minimálně třemi významnými událostmi spojenými s vybraným tématem.
2. Poté vytvořte číslovaný seznam s minimálně třemi důležitými osobnostmi, které přispěly k vývoji/rozvoji související s tématem.
3. Vytvořte vnořený seznam, kde jedna položka nečíslovaného seznamu bude obsahovat číslovaný podseznam důležitých událostí spojených s danou událostí.
---
layout: default
---
## Úkol 3: Odkazy a Obrázky
1. Přidejte do souboru `it_markdown_practice.md` inline odkaz na související článek na Wikipedii.
2. Vytvořte reference odkaz na další zdroj informací k tématu
3. Přidejte inline obrázek pomocí URL obrázku dle vašeho výběru.
4. Přidejte reference obrázek pomocí URL obrázku dle vašeho výběru.


## Úkol 4: Citace a Kód
1. Přidejte do souboru `it_markdown_practice.md` citaci výroku jednoho z důležitých osob tématu.
2. Vložte do souboru blok kódu s ukázkou kódu.
3. Použijte inline kód v rámci jednoho z odstavců k zobrazení příkladu kódu.
---
layout: default
---
## Úkol 5: Tabulky
1. Vytvořte tabulku v souboru `it_markdown_practice.md` s minimálně dvěma sloupci a třemi řádky.
2. Naplňte tabulku relevantními daty.


## Úkol 6: Další Prvky
1. Přidejte do souboru `it_markdown_practice.md` horizontální čáru.
2. Vytvořte seznam úkolů s checkboxy pro studenty, kde některé úkoly budou zaškrtnuté a některé nezaškrtnuté.


## Závěrečný Úkol
1. Nahrajte váš soubor `it_markdown_practice.md` do GitHub repozitáře.

---
src: '../../pages/thanku.md'
---