module.exports = React.createClass({
    render: function() {
        return (
            <div className="card">
                <h2 className="card__title">{this.props.title}</h2>
                <p>{this.props.description}</p>
            </div>
        );
    }
});
