# o que fazer
    - add refrão
    - filtros de busca em songbook
    - add liquibase
    - add nome do autor no final
    - cadatro de batidas/ritmos
    - add campos batida ao cipher factory





# EasyCipherFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.










# Regra do dicionario de acordes
considere que o usuario do sistema pode selecio uma serie de notas em um braço de violão digital, clicando nas cordas em determindas casas
podendo ser de 0 a 6 notas selecionas

as notas selecionas serão testadas em 12 escalas diferentes, uma escala para cada nota existente.
a escala será formada baseando-se na formula da escala maior   (nota-principal, tom, tom, semi-tom, tom ,tom, tom)

ex:

C   D   E   F   G   A   B
C#  Eb  F   F#  Ab  Bb  C
D   E   F#  G   A   B   C#
E   ...
F   ...
F#  ...
...


para cada escala, as notas selecionadas serão testadas em:

    checa inversaão de acorde:  verica se a nota mais grave das que foram selecionas é diferente do 1° grau da escala
    checa se contem sétima: verifica se o 7° grau menor (meio tom abaixo) está presente nas notas selecionadas
    checa se contem sétima maior: verifica se o 7° grau está presente nas notas selecionadas
    checa se contem Ninth: verifica se o 2° grau está presente nas notas selecionadas
    checa se contem diminuto: verifica se o 5° grau menor (meio tom abaixo) está presente nas notas selecionadas
    checa se contem Eleventh: verifica se o 4° grau está presente nas notas selecionadas
    checa se contem Thirteenth: verifica se o 6° grau está presente nas notas selecionadas
    checa se foi omitida o 5° grau: verifica se o 5° grau NÃO está presente nas notas selecionadas
    checa se é Major: verifica se o 3° está presente nas notas selecionadas
    checa se é Minor: verifica se o 3° menor (meio tom abaixo) está presente nas notas selecionadas
    checa se é Suspended: verifica se o 3°



 //BONIFICAR
se maior: +3
se menor: +3
se suspeso: +3
se tiver duas vezes o 1° grau: +2
se tiver duas vezes o 3° grau: +1
se tiver duas vezes o 5° grau: +1

se tiver o 7° grau menor: +1
se tiver o 9° grau menor: +1
se tiver o 11° grau menor: +1 
se tiver o 13° grau menor: +1
se tiver for diminuta: +1
se tiver o 7° grau maior: +1
se não omitir o 5° grau: +1
se omitir o 5° grau corretamente: +1

 //PENALIZAR
se nao for maior menor ou suspensa: -10
se tiver duas vezes o 6° grau maior: -1
se tiver duas vezes o 2° grau maior: -1
se omitir o 5° grau não corretamente: -3
se tiver o 3º grau maior e o menor: -5
se tiver mais de 2 variações: -2
