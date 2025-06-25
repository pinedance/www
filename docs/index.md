---
---

# Pinedances's One Fine Story

운영 중인 웹페이지들

## Blogs

{% with items = showcase.blogs %}
{% for item in items %}
{% with item=item %}
{% include "showcase_item.html" %}
{% endwith %}
{% endfor %}
{% endwith %}

## Research

{% with items = showcase.research %}
{% for item in items %}
{% with item=item %}
{% include "showcase_item.html" %}
{% endwith %}
{% endfor %}
{% endwith %}

<!-- 

## Demo

연구 및 프로젝트의 데모 페이지

{% for dm in demo %}

- {{ dm.author }}. {{dm.title }} {{ dm.year }} [Internet]. Available from: [{{ dm.url }}]({{ dm.url }})

{% endfor %} 

-->

## Education

교육 자료

- [상한금궤Plus](https://pinedance.github.io/shanghanlun/)

- [How to Analysis Text Data of Traditional East Asian Medicine](https://nbviewer.org/github/pinedance/workshop-KM-data-analysis/blob/master/notebooks/README.ipynb)

## Apps & Webs

{% with items = showcase.appsnwebs %}
{% for item in items %}
{% with item=item %}
{% include "showcase_item.html" %}
{% endwith %}
{% endfor %}
{% endwith %}

<!--
## 기고
-->
