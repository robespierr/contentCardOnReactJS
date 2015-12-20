var Card = require('./card');

module.exports = React.createClass({
    render: function() {
        var cardsItems = this.props.data.map(function(card) {
            return (
                <div className="cards-list__item grid__item one-quarter lap--one-half palm--one-whole" key={card.id}>
                    <Card link={card.link}
                          icon={card.icon}
                          title={card.title}
                          description={card.description}
                          backgroundImage={card.backgroundImage}>
                    </Card>
                </div>
            );
        });

        return (
            <div className="cards-list grid">
                {cardsItems}
            </div>
        );
    }
});
