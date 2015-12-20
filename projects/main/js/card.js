module.exports = React.createClass({

    handleCardEdit: function() {
        var self = this;
        console.log("Card edit " + self.props.title);
    },

    handleCardPrint: function() {
        var self = this;
        console.log("Card print " + self.props.title);
    },

    handleCardShare: function() {
        var self = this;
        console.log("Card share " + self.props.title);
    },

    getDefaultProps: function() {
        return {
            "link":            "#",
            "icon":            "hidden",
            "title":           "New card",
            "description":     "",
            "backgroundImage": ""
        };
    },

    render: function() {
        return (
            <article className="card" style={ {backgroundImage: 'url('+ this.props.backgroundImage +')'} }>
                <a className="card__wrap" href={this.props.link}>
                    <h2 className="card__title">
                        <i className={'card__icon fa ' + this.props.icon}></i>
                        {this.props.title}
                    </h2>
                    <div className="card__content">
                        <p>{this.props.description}</p>
                    </div>
                </a>
                <div className="card__controls">
                    <div className="card__controls-item">
                        <button className="card__button" onClick={this.handleCardEdit}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </div>
                    <div className="card__controls-item">
                        <button className="card__button" onClick={this.handleCardPrint}>
                            <i className="fa fa-print"></i>
                        </button>
                    </div>
                    <div className="card__controls-item">
                        <button className="card__button" onClick={this.handleCardShare}>
                            <i className="fa fa-share"></i>
                        </button>
                    </div>
                </div>
            </article>
        );
    }
});
