/**
 *  Animator component for animator system.
 */
class Animator extends Component
{
    /**
     * Animator constructor
     * @param {Object} damage (Number, optional), speed (Number), ignore (String array). 
     */
    constructor(opts)
    {
        super(opts);
    }

    /**
     * Extract opt data from opts after construtor.
     */
    create()
    {
        this.frames = this.getOpt("frames");                    // Frames of animation.
        this.timing = this.getOpt("timing", Number, 0.033);     // Pause between frames in seconds.
        this.repeat = this.getOpt("repeat", Boolean);           // If animation should be repeating.

        this.index = 0;                                         // Current frame of aniamtion.
        this.frameCount = this.frames.length;                   // Number of frames in animation.
        this.sprite = this.frames[0]                            // Current sprite, set to first frame.
        this.currentTime = this.timing;                              // Current time till next frame.

        super.create();
    }
}