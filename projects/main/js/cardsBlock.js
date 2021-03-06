var qwest     = require('./lib/qwest');
var CardsList = require('./cardsList');

module.exports = React.createClass({
    loadCardsFromServer: function() {
        //todo: move request logic to reusable resource
        var self = this;

        qwest.get(this.props.url)
            .then(function(xhr, data) {
                self.setState({ data: data });
            })
            .catch(function(xhr, data, error) {
               console.error(error);
            });
    },

    getInitialState: function() {
        return { data: [] };
    },

    componentDidMount: function() {
        this.loadCardsFromServer();
    },

    render: function() {
        return (
            <section className="cards-block">
                <div className="cards-block__wrap">
                    <h1 className="cards-block__title">Some cards</h1>
                    <CardsList data={this.state.data}></CardsList>
                </div>
            </section>
        );
    }
});
