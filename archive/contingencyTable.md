# Contingency Table

## Contingency Table 이란?

[Contogency table](https://en.wikipedia.org/wiki/Contingency_table) 혹은 [Confusion matrix](https://en.wikipedia.org/wiki/Confusion_matrix)라고도 한다. 

변수 형태가 factor 인 경우에 n x m 형태의 frequency table(혹은 ratio table)을 지칭

## Table 만들기

R에서 다음과 같은 함수로 만들 수 있다. 

* `table()`
* `ftable( )`
* `xtabs( )`
* `CrossTable( )`

자세한 내용은 [Quick-R/Frequencies and Crosstabs](http://www.statmethods.net/stats/frequencies.html)를 참고

## Tests of Independence 

### Chi-Square Test

* `chisq.test(mytable)`

### Fisher Exact Test

* `fisher.test(x)`

### Mantel-Haenszel test

* `mantelhaen.test(x)`

### Loglinear Models 

* `loglm( )`

## Measures of Association 

### phi coefficient

### contingency coefficient

### Cramer's V

=> `assocstats(mytable)` in the vcd package

### Cohen's kappa

### weighted kappa

=> `kappa(mytable)` in the vcd package 

### lambda(λ) 

[The Goodman-Kruskal Index of Predictive Association](http://vassarstats.net/lamexp.html)

### the other approach

#### vector approch

(weighted) Euclidean distance

#### probabilistic approch

association strength

#### evaluational approch

accuracy and [F1 measure](https://en.wikipedia.org/wiki/F1_score) : [coursera tutorial](https://youtu.be/2akd6uwtowc)


### ref

[Richard Darlington's article on Measures of Association in Crosstab Tables](http://node101.psych.cornell.edu/Darlington/crosstab/TABLE0.HTM)

[measures of association for contingency tables](http://www.ucl.ac.uk/english-usage/staff/sean/resources/phimeasures.pdf)

* Probabilistic approach : Cramer's, Probabilistically adjusted C
* Bayesian approach 



## Visualizing results


## Converting Frequency Tables to an "Original" Flat file 
