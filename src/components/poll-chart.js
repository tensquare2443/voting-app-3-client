import React from 'react';
import Chart from 'chart.js';

class PollChart extends React.Component {

  componentDidMount() {
    // alert("didmount");
    if (this.props.poll.answers) {
      this.renderGraph();
    }
  };
  componentDidUpdate(prevProps) {
    // alert("didupdate");
    this.renderGraph();
  };
  componentWillUnmount() {
    // alert("willunmount");
    this.props.togglePoll();
  };

  renderGraph = () => {
    var colors = [
      'rgba(141,211,199, 0.4)',
      'rgba(255,232,71, 0.4)',
      'rgba(190,186,218, 0.4)',
      'rgba(251,128,114, 0.4)',
      'rgba(128,177,211, 0.4)',
      'rgba(253,180,98, 0.4)',
      'rgba(179,222,105, 0.4)',
      'rgba(252,205,229, 0.4)',
      'rgba(217,217,217, 0.4)',
      'rgba(188,128,189, 0.4)',
      'rgba(204,235,197, 0.4)',
      'rgba(255,255,114, 0.4)'
    ];
    var answers = this.props.poll.answers;
    var labels = answers.map((answer) => {
      return answer.answer;
    });
    var data = answers.map((answer) => {
      return answer.votes;
    });
    var backgroundColor = [];

    if (answers.length < 3) {
      backgroundColor = [colors[0], colors[2]];
    } else if (answers.length >= 3 && answers.length <= 12) {
      backgroundColor = colors.slice(0, answers.length + 1);
    } else if (answers.length > 12) {
      var randomIndex = Math.floor(Math.random()*12);
      for (var i = 0; i < answers.length; i++) {
        backgroundColor.push(colors[randomIndex]);
        if (randomIndex === 11) {
          randomIndex = 0;
        } else {
          randomIndex++;
        };
      }
    }

    var borderColor = backgroundColor.map((color) => {
      return color.replace('0.2', '1');
    });
    var borderWidth = 1;
    var datasets = [{data, backgroundColor, borderColor, borderWidth}];

    var options = {cutoutPercentage: 33.3333};
    var pie = document.getElementById("pie");

    new Chart(pie, {
      type: 'pie',
      data: {labels, datasets},
      options
    });
  };

  render() {
    // alert("rendering");
    return(
      <div className="graph-container">
        <canvas id="pie" width="3" height="2"></canvas>
      </div>
    );
  }
}

export default PollChart;
