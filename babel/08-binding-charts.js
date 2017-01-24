const getCharts = () => {
    const chartWrapper = document.querySelectorAll('.chart-wrapper');
    for (let i = 0; i < chartWrapper.length; i++) {
        const chartId = chartWrapper[i].getAttribute('id'),
            percent = parseInt(chartWrapper[i].getAttribute('data-percent'));
        if (inView('.chart-wrapper', i) && chartWrapper[i].getAttribute('animation') != 'true') {
            chartWrapper[i].setAttribute('animation', 'true');
            chartAnimation(chartId, percent);
        }
    }
    
}

const chartAnimation = (id, amount) => {
    const graph = new ProgressBar.Circle('#' + id, {
        strokeWidth: 6,
        color: '#59595b',
        trailColor: '#C6C8CA',
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
            value: '',
            alignToBottom: false
        },
        from: {
            color: '#59595b'
        },
        to: {
            color: '#59595b'
        },
        // Set default step function for all animate calls
        step: function(state, graph) {
            graph.path.setAttribute('stroke', state.color);

            var value = Math.round(graph.value() * 100);
            
            if (value === 0) {
              graph.setText('');
            } else {
              graph.setText(Math.floor(value / 10)+"/10");
            }

        }
    });
    graph.animate(amount / 10); // Number from 0.0 to 1.0        
}