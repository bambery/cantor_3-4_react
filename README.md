# Cantor 3/4

[![Node.js CI](https://github.com/bambery/cantor_3-4_react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/bambery/cantor_3-4_react/actions/workflows/node.js.yml)

## I Have Described Every Cantor Set
Sorry math students, I have described every Cantor set (within the limitations of [MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) of course)!

Please visit https://bambery.github.io/cantor_3-4_react/ to play with nowhere-dense sets.


## How to Use
Using the UI, select the number of segments to divide the interval into. Next, select the segments you wish to have removed with each iteration. Third, select how many iterations you wish to view, keeping in mind that the more iterations, the less comprehensible the graphics will be. Additionally, the denominator must stay below 2<sup>53</sup> - 1: due to this, I have restricted the number of iterations to maximum of 10. I could not justify a switch to BigInt, but please feel free to message me with reasons why it might be interesting.

## Downloading the Generated Cantor-like Sets
After pressing "Cantor-ify!", you will see a graphic representing the intervals for each Cantorian iteration with a table listing the endpoints. All tables can be downloaded into a csv with the "Download This Data" button at the top.

## History
This is a react rewrite of a small proof of concept that I hacked together:
https://github.com/bambery/cantor_3-4 to demonstrate [asymmetrical Cantor sets](https://bambery.github.io/cantor_3-4/).

## Usage Permisions
I attempted to find a software license that would allow for general, non-commercial use and modification with accreditation, but this [appears](https://choosealicense.com/licenses/) [to not](https://creativecommons.org/faq/#can-i-apply-a-creative-commons-license-to-software) [exist](https://opensource.stackexchange.com/questions/6719/non-commercial-licensing-recommendation). Only allocated one story point to this task: therefore at this time, there is no license to use this software or any contents presented herein. If you wish to use or modify this codebase, please feel free to [contact me](mailto:cantor@bettercriticals.mozmail.com) and I will provide permission. You may reproduce this work without modification with accreditation back to me without permission.

When I have suitable time to allocate time to investigate, I will find and attach a suitable license. You can check where that is ranked on the [Trello for remaining tasks](https://trello.com/b/VnjJEpic/cantor-3-4).

This repository will, once a license is determined and attached, be provided free to those who wish to play around with Cantor-like sets with flexible constraints. The code is written to avoid recursion and be generally comprehensible to those with basic coding and mathmatical skills, and can be extended to cover additional scenarios if desired. No promises made on the quality of the React code, as this was my first React app :smile:.
