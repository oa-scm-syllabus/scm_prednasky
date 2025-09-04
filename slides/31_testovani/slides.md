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
title: "Testování"
exportFilename: "37_testovani"
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

# Co je automatické testování?

- Automatizovaný způsob ověření, že program funguje správně.
- Umožňuje rychle odhalit chyby po úpravách kódu.
- Zvyšuje spolehlivost programu.



---

# Proč testujeme?

- Abychom si ověřili, že náš kód dělá to, co očekáváme.
- Ušetříme čas při hledání chyb.
- Pomáhá udržovat kód čistý a přehledný.
- Klíčové při větších projektech nebo spolupráci ve skupině.

---

# Typy testů

- **Unit testy** - testují jednotlivé části kódu.
- **Integrační testy** - testují, jak jednotlivé části kódu spolu komunikují.
- **Funkční testy** - testují, zda program dělá to, co má.
- **End-to-end testy** - testují celý program jako celek.

---

# Knihovna `pytest`

- Jednoduchá knihovna pro psaní testů v Pythonu.
- Podporuje testování všech typů testů.
  - parametrizované testy.
  - testování výjimek.
  - testování souborů, databází, API, atd.
  - mockování a patchování.
- Píše se jednodušeji než `unittest`.
- Funguje perfektně i v **PyCharmu**.

📦 Instalace (pokud ještě není):
```bash
pip install pytest
```

---

# Základní test

```python
# soubor: test_matematika.py

def secti(a, b):
    return a + b

def test_secti():
    assert secti(2, 3) == 5
```

- Test je obyčejná funkce, která začíná na `test_`.
- `assert` porovnává skutečný výsledek s očekávaným.

---

# Spuštění testů

- Spuštění všech testů v adresáři:
```bash
pytest
```

- Spuštění konkrétního testu:
```bash
pytest test_matematika.py
```

- Spuštění testů včetně `print` výstupů:
```bash
pytest -s
```

---

## Spuštění testu v PyCharmu

1. Otevři soubor s testem (např. `test_matematika.py`)
2. Klikni pravým tlačítkem kamkoliv do souboru.
3. Vyber **Run 'pytest in test_matematika'**

💡 Výsledek testu se zobrazí dole v panelu *Run/Test Results*.

✅ Zeleně – test prošel  
❌ Červeně – test selhal, PyCharm vypíše podrobnosti

---

# Výstup testu v PyCharmu

Při chybě např.:

```python
def test_secti():
    assert secti(2, 3) == 6  # chyba!
```

PyCharm vypíše:
```
>       assert 5 == 6
E       AssertionError
```

➡ Pomáhá rychle najít chybu.

---

# Testování chyb (výjimek)

```python
import pytest

def deleni(a, b):
    return a / b

def test_deleni_nulou():
    with pytest.raises(ZeroDivisionError):
        deleni(1, 0)
```

✅ Pomocí `pytest.raises` otestujeme, že opravdu dojde k výjimce.

---
layout: two-cols-header
---

# Příklad

::left::

`faktura.py`
```python
def vypocet_ceny_z_dph(cena_bez_dph, sazba_dph):
    if cena_bez_dph < 0:
        raise ValueError("Cena nesmí být záporná")
    if sazba_dph not in [10, 15, 21]:
        raise ValueError("Neplatná sazba DPH")
    
    cena_s_dph = cena_bez_dph * (1 + sazba_dph / 100)
    return round(cena_s_dph, 2)
```

::right::

`test_faktura.py`
```python
import pytest
from faktura import vypocet_ceny_z_dph

def test_sazba_21_procent():
    assert vypocet_ceny_z_dph(100, 21) == 121.00

def test_sazba_15_procent():
    assert vypocet_ceny_z_dph(200, 15) == 230.00

def test_neplatna_sazba():
    with pytest.raises(ValueError):
        vypocet_ceny_z_dph(100, 5)

def test_zaporna_cena():
    with pytest.raises(ValueError):
        vypocet_ceny_z_dph(-50, 21)
```

---
layout: image-right
image: https://cover.sli.dev
---

# Strategie testování

---

# Přístupy k psaní testů

Existují různé strategie, **kdy** a **jak** testy píšeme:

# 1️⃣ Klasický přístup – testy až po napsání funkce

- Nejdříve napíšeme funkci, která něco dělá.
- Poté vytvoříme testy, abychom si ověřili, že funguje správně.
- Typické ve výuce a při menších projektech.

✅ Jednoduché na pochopení  
⚠️ Můžeme zapomenout na ošetření výjimek nebo krajních případů

---

# 2️⃣ Test Driven Development (TDD)

- **Nejdřív píšeme testy**, pak teprve samotnou funkci.
- Postup:
    1. Napíšeme test, který zatím selhává.
    2. Vytvoříme funkci tak, aby test prošel.
    3. Refaktorujeme (vylepšíme) kód a test stále musí procházet.

💡 Výhody:
- Nutí nás přemýšlet nad zadáním a vstupy/výstupy už předem.
- Kód je od začátku dobře otestovaný.
- Pomáhá u složitějších funkcí nebo týmové práci.

⚠️ Nevýhoda: ze začátku náročnější na myšlení a disciplínu

---

# Příklad TDD

```python
# test_prvni.py
from kalkulacka import secti

def test_secti():
    assert secti(2, 3) == 5
```

Zatím ale `kalkulacka.py` neexistuje!

Pak teprve vytvoříme:

```python
# kalkulacka.py
def secti(a, b):
    return a + b
```

✅ Test projde, funkce je hotová.





---

# Shrnutí

- Automatické testování zajišťuje, že program funguje správně.
- `pytest` je jednoduchý nástroj pro psaní testů.
- V **PyCharmu** můžeme testy snadno spustit a vidět výsledky.
- Testy se píší jako obyčejné funkce s `assert`.
- Existují různé strategie psaní testů.

---
src: '../../pages/thanku.md'
---