class RenderComponent extends Component
{
    constructor(opts)
    {
        super(opts);
    }

    create()
    {
        this.position = this.getOpt("position", Vector2);

        super.create();
    }
}