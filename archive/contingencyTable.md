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

ref

* [Quick-R/Frequencies and Crosstabs](http://www.statmethods.net/stats/frequencies.html)

## Tests of Independence 

ref

* [Quick-R/Frequencies and Crosstabs](http://www.statmethods.net/stats/frequencies.html)

### Chi-Square Test

* `chisq.test(mytable)`

### Fisher Exact Test

* `fisher.test(x)`

### Mantel-Haenszel test

* `mantelhaen.test(x)`

### Loglinear Models 

* `loglm( )`


## Measures of Association 

strength of the relationship

### Over view

ref: [Tests of Significance and Measures of Association for Nominal and Ordinal Variables@youtube](https://youtu.be/iPSV-n9UWuo?t=10m23s)

#### For Nominal Data

|    | Measure                 | Type of Variable                                                  | Symmetric? | Notes                                                                              |
|--- |-------------------------|-------------------------------------------------------------------|------------|------------------------------------------------------------------------------------|
| ★ | Lambda                  | Nominal                                                          | Asymmetric | if Lambda is zero, use Cramer's V to confirm<br>DR IC                              |
| ★ | Cramer's V              | Nominal by Nominal<br>Norminal by Ordinal                       | Asymmetric | Best choice for Norminal by Ordinal                                                |
|    | Contingency Coefficient | Nominal by Nominal<br>Norminal by Ordinal                       | Asymmetric | Upper limit depends on the number of rows and columns in the table. Use Cramer's V |
| ★ | Phi                     | Nominal or Ordinal                                               | Symmetric  | Only Suitable for 2x2 tables                                                       |

#### For Ordinal Data

|    | Measure                 | Type of Variable                                                  | Symmetric? | Notes                                                                              |
|--- |-------------------------|-------------------------------------------------------------------|------------|------------------------------------------------------------------------------------|
| ★ | Gamma                   | Ordinal by Ordinal<br>Ordinal with dichotomous Norminal Variables | Symetric   |                                                                                    |
|    | Somer's D               | Ordinal by Ordinal                                                | Asymmetric | Why not use Gamma                                                                  |
|    | Kendall's Tau-B         | Ordinal by Ordinal                                                | Symetric   | Only appropriate when the number of rows and number of columns are equal           |
|    | Kendall's Tau-B         | Ordinal by Ordinal                                                | Symetric   | Use when number of rows and number of columns are not equal                        |

### Lambda(λ) 

what is Lambda? : [The Goodman-Kruskal Index of Predictive Association](http://vassarstats.net/lamexp.html)

```r
# ref : https://gist.github.com/marcschwartz/3665743
# Calculate Lambda
# Return 3 values:
# 1. Lambda C~R
# 2. Lambda R~C
# 3. Lambda Symmetric (Mean of above)
# x = table
calc.lambda <- function(x)
{
  x <- matrix(as.numeric(x), dim(x))
  
  SumRmax <- sum(apply(x, 1, max))
  SumCmax <- sum(apply(x, 2, max))
  MaxCSum <- max(colSums(x))
  MaxRSum <- max(rowSums(x))
  n <- sum(x)

  L.CR <- (SumRmax - MaxCSum) / (n - MaxCSum)
  L.RC <- (SumCmax - max(rowSums(x))) / (n - MaxRSum)
  L.S <- (SumRmax + SumCmax - MaxCSum - MaxRSum) /
        ((2 * n) - MaxCSum - MaxRSum)

  Llist <- list(L.CR, L.RC, L.S)
  names(Llist) <- c("L.CR", "L.RC", "L.S")

  Llist
}
```

### Cramer's V

```r
# ref : https://gist.github.com/marcschwartz/3665743
# Calculate Cramer's V
# For 2 x 2 tables V = Phi
# x = table
calc.CV <- function(x)
{
  x <- matrix(as.numeric(x), dim(x))
  
  CV <- sqrt(chisq.test(x, correct = FALSE)$statistic /
       (sum(x) * min(dim(x) - 1)))

  as.numeric(CV)
}
```

### contingency coefficient

```r
# ref : https://gist.github.com/marcschwartz/3665743
# Calculate Contingency Coefficient (Pearson's C)
# and Sakoda's Adjusted Pearson's C
# x = table
calc.cc <- function(x)
{
  x <- matrix(as.numeric(x), dim(x))
  
  # CC - Pearson's C
  chisq <- chisq.test(x, correct = FALSE)$statistic
  C <- sqrt(chisq / (chisq + sum(x)))

  # Sakoda's adjusted Pearson's C
  k <- min(dim(x))
  SC <- C / sqrt((k - 1) / k)

  CClist <- list(as.numeric(C), as.numeric(SC))
  names(CClist) <- c("Pearson.C", "Sakoda.C")

  CClist
}
```

### phi coefficient

```r
# ref : https://gist.github.com/marcschwartz/3665743
# Calculate Phi Coefficient
# x = table
calc.phi <- function(x)
{
  x <- matrix(as.numeric(x), dim(x))
  
  phi <- sqrt(chisq.test(x, correct = FALSE)$statistic / sum(x))
  as.numeric(phi)
}
```

=> `assocstats(mytable)` in the vcd package

### Cohen's kappa

### weighted kappa

=> `kappa(mytable)` in the vcd package 


### difference in proportions, relative risk, odds ratios

ref: 
* [Measures of Associations in I x J tables](https://onlinecourses.science.psu.edu/stat504/node/84)
* [Public Health 250B - Lecture 5: Measures of association](https://www.youtube.com/watch?v=w2g5gzWj71s)

#### Relative measures

Risk/rate ratio (RR)

Hazard ratio

Prevalence ratio

Odds ratio

#### Absolute measures

Attributable risk(AR) - aka risk/rate difference(RD)

Attributable risk percent (AR%)

Population attributable risk(PAR)

Population attributable risk percent(PAR%)


### miscellaneous measures of association

[R Code for miscellaneous measures of association](https://gist.github.com/pinedance/698ad7f6778acdf0e819)


### the other approach

#### vector approch

(weighted) Euclidean distance

#### probabilistic approch

association strength

#### evaluational approch

accuracy and [F1 measure](https://en.wikipedia.org/wiki/F1_score) : [coursera tutorial](https://youtu.be/2akd6uwtowc)

#### term weighted approch

TF-IDF

### ref

[Richard Darlington's article on Measures of Association in Crosstab Tables](http://node101.psych.cornell.edu/Darlington/crosstab/TABLE0.HTM)

[measures of association for contingency tables](http://www.ucl.ac.uk/english-usage/staff/sean/resources/phimeasures.pdf)

* Probabilistic approach : Cramer's, Probabilistically adjusted C
* Bayesian approach 



## Visualizing results


## Converting Frequency Tables to an "Original" Flat file 

