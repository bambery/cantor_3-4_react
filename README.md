# Cantor 3/4

[![Node.js CI](https://github.com/bambery/cantor_3-4_react/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/bambery/cantor_3-4_react/actions/workflows/node.js.yml)

This is a react rewrite of a small proof of concept that I hacked together:
https://github.com/bambery/cantor_3-4 to demonstrate asymmetrical Cantor sets.

## Usage Permisions
When this repository is complete, I will attach a usage license that allows for general, non-commercial use and modification, with accrediation back to me.

This repository is provided for free to those who wish to play around with Cantor-like sets with flexible constraints. The code is written to avoid recursion and be generally comprehensible to those with basic coding and mathmatical skills, and can be extended to cover additional scenarios if desired. If modifying the code, I highly recommend rewriting tests to keep them up-to-date: tiny errors quickly spiral to spoil all results.

## How to Use
Using the UI, select the number of segments to divide the interval into. Next, select the segments you wish to have removed with each iteration. Third, select how many iterations you wish to view, keeping in mind that the more iterations, the less comprehensible the graphics will be.

## Downloading the generated Cantor sets
After pressing "Cantorify!", you will see a graphic representing the intervals for each Cantorian iteration with a table listing the endpoints. All tables can be downloaded into a csv with the "Download This Data" button at the top.
