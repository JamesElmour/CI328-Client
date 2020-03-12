/**
 * Button component for button systems.
 */
class Button extends Component
{
    /**
     * Extract data from opts.
     */
    create()
    {
        this.width = this.getOpt("Width", Number);          // Width of button.
        this.height = this.getOpt("Height", Number);        // Height of button.
        this.onClick = this.getOpt("onClick", Function);    // Function to ran when button is clicked.
        super.create();
    }
}