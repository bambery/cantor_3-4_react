export default class Report {
    constructor(cantorSet){
        this.output = ''
        let sep = '|'
        let eol = '\n'

        this.output = this.output.concat(`sep=${sep}${eol}`)
        this.output = this.output.concat(`Cantor Set of ${cantorSet.numSegments} Segments, Removing Intervals from [${cantorSet.toRemove.join(', ')}] in ${cantorSet.numIter} Iterations${eol}`)
        this.output = this.output.concat(`Iteration${sep}Number of Segments${sep}Number of Gaps${eol}`)

        cantorSet.iterations.forEach( (intCol, index) => {
            let iterHeader = `${index + 1}${sep}${intCol.count}${sep}${intCol.count - 1}${eol}`
            this.output = this.output.concat(iterHeader)

            for(let i = 0; i < intCol.intervals.length - 1; i++){
                let intervalLine = `${sep}${intCol.intervals[i].strPrint}${sep}${intCol.gaps[i].strPrint}${eol}`
                this.output = this.output.concat(intervalLine)
            }
            this.output = this.output.concat(`${sep}${intCol.intervals[intCol.intervals.length - 1].strPrint}${sep}${eol}`)
        })
    }
}
