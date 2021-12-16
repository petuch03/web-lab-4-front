<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h1>This page is protected by auth</h1>
      <form class="signup" @submit.prevent="check">
        <label>input x</label>
        <div>
          <select v-model="x" id="x">
            <option disabled value="">choose one</option>
            <option>-4</option>
            <option>-3</option>
            <option>-2</option>
            <option>-1</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <label for="y">input y</label>
        <div>
          <input type="text" id="y" v-model="y" name="y" class="form-control"
                 placeholder="y">
        </div>

        <label>input r</label>
        <div>
          <select v-model="r" id="r" @change="onChange($event)">
            <option disabled value="">choose one</option>
            <option>-4</option>
            <option>-3</option>
            <option>-2</option>
            <option>-1</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <button type="submit" style="height: 25px">Check</button>
      </form>
      <div id="textExample" style="width: 50%; text-align: center; float: left">
        <table class="table table-bordered" style="width: 80%; text-align: center">
          <thead>
          <tr>
            <th> x</th>
            <th> y</th>
            <th> r</th>
            <th> res</th>
            <th> current</th>
          </tr>
          </thead>
          <tr v-for="hit in hits">
            <td>{{ parseFloat(hit.x).toFixed(5) }}</td>
            <td>{{ parseFloat(hit.y).toFixed(5) }}</td>
            <td>{{ hit.r}}</td>
            <td>{{ hit.res }}</td>
            <td>{{ hit.current.slice(11, 23) }}</td>
          </tr>
        </table>
      </div>
      <div id="area_diagram" style="width: 50%; text-align: center; float: right">
        <svg class="diagram" id="mySVG" xmlns="http://www.w3.org/2000/svg" width="310" height="310"
             style="font-size: 10px">
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import * as d3 from "../router/http_d3js.org_d3.v7";

const lines = [5, 34, 63, 92, 121, 179, 208, 237, 266, 295];
const values = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
export default {
  data() {
    return {
      x: 0,
      y: 0,
      r: 1,
      hits: [],
    };
  },
  methods: {
    check: function () {
      let x = this.x;
      let y = this.y;
      let r = this.r;
      this.$store.dispatch('check', {x, y, r})
          .then((resp) => {
            this.hits.push(resp.data);
            this.drawOnePoint(this.hits.length - 1);
            this.x = Math.round(x);
          })
          .catch(err => console.log(err))
    },
    getAll: function () {
      this.$store.dispatch('getAll')
          .then((resp) => {
            this.hits = resp.data;
          })
          .catch(err => console.log(err))
    },
    drawAxes: function () {
      let graph;
      document.getElementById("mySVG").innerHTML = '';
      graph = d3.select('svg');
      graph.append('line')
          .attr('x1', 0)
          .attr('y1', 150)
          .attr('x2', 300)
          .attr('y2', 150)
          .attr('stroke', '#000000')

      graph.append('line')
          .attr('x1', 150)
          .attr('y1', 0)
          .attr('x2', 150)
          .attr('y2', 300)
          .attr('stroke', '#000000')


      for (let i = 0; i < lines.length; i++) {
        graph.append('line')
            .attr('x1', 145)
            .attr('y1', lines[i])
            .attr('x2', 155)
            .attr('y2', lines[i])
            .attr('stroke', '#000000')

        graph.append('text')
            .attr('x', 156)
            .attr('y', lines[i])
            .attr('stroke', '#000000')
            .text(values[9 - i])

        graph.append('line')
            .attr('x1', lines[i])
            .attr('y1', 145)
            .attr('x2', lines[i])
            .attr('y2', 155)
            .attr('stroke', '#000000')

        graph.append('text')
            .attr('x', lines[i])
            .attr('y', 145)
            .attr('stroke', '#000000')
            .text(values[i])
      }

      graph.append('polygon')
          .attr('points', "300,150 295,155 295,145")
          .attr('fill-opacity', 0.4)
          .attr('stroke', '#000000')
          .attr('fill', '#51b1e3')

      graph.append('polygon')
          .attr('points', "150,0 145,5 155,5")
          .attr('fill-opacity', 0.4)
          .attr('stroke', '#51b1e3')
          .attr('fill', '#51b1e3')

      graph.append('polygon')
          .attr('points', `${150 - this.r * 29},150 ${150 - this.r * 29},${150 + this.r * 29 / 2} 150,${150 + this.r * 29 / 2} 150,150`)
          .attr('fill-opacity', 0.4)
          .attr('stroke', '#51b1e3')
          .attr('fill', '#51b1e3')

      graph.append('polygon')
          .attr('points', `${150 + this.r * 29},150 150,${150 - this.r * 29 / 2} 150,150`)
          .attr('fill-opacity', 0.4)
          .attr('stroke', '#51b1e3')
          .attr('fill', '#51b1e3')

      graph.append('path')
          .attr('d', `M ${150 - this.r * 29} 150 A ${this.r * 29} ${this.r * 29}, 0, 0, 1, 150 ${150 - this.r * 29} L 150 150 Z`)
          .attr('fill-opacity', 0.4)
          .attr('stroke', '#51b1e3')
          .attr('fill', '#51b1e3')
    },
    onChange() {
      this.drawAxes();
      this.drawAll();
    },

    drawOnePoint(index) {
      let graph = document.querySelector('svg');
      graph.insertAdjacentHTML('beforeend', `<circle r="3" cx="${150 + (parseFloat(this.hits[index].x) * 29)}" cy="${150 - (parseFloat(this.hits[index].y) * 29)}" fill="${(this.hits[index].res === 'true') ? 'green' : 'red'}"/>`);
    },
    drawAll() {
      for (let i = 0; i < this.hits.length; i++) {
        this.drawOnePoint(i);
      }
    },
    getMousePos(evt) {
      const svg = document.getElementById('mySVG');
      let rect = svg.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    },
    clickOnChart(canvas, event) {
      let pos = this.getMousePos(event);
      this.x = ((pos.x - (300 / 2)) / (29));
      this.y = ((300 / 2) - pos.y) / (29);
      this.check();
    },
  },
  mounted() {
    this.getAll();
    let canvas = document.querySelector('svg');
    canvas.addEventListener('mousedown', event => this.clickOnChart(canvas, event));
  },
  updated() {
    this.onChange();
  }
}
</script>

<style scoped>

</style>