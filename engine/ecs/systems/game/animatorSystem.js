/**
 * Animator system, processes all animator components.
 */
class AnimatorSystem extends System
{
    /**
     * Internal method to process a given component.
     * @param {Animator} animator 
     */
    process(animator)
    {

        if(this.shouldAdvanceFrame(animator))
        {
            if(this.endAnimation(animator))
            {
                return;
            }

            this.advanceFrame(animator);
        }
    }

    /**
     * Check if animator should advance to next frame.
     * @param {Animator} animator 
     */
    shouldAdvanceFrame(animator)
    {
        // Subtract current deltatime from animator's next frame time.
        animator.currentTime -= this.dt;

        // Return if animator should advance to next frame.
        return (animator.currentTime <= 0);
    }

    /**
     * Check if animator's animation has ended.
     * @param {Animator} animator 
     */
    endAnimation(animator)
    {
        // If animator's displaying frame is at the end of its' animation.
        if(animator.index >= animator.frameCount)
        {
            // If animator set to repeat, reset frame index and return false.
            if(animator.repeat)
            {
                animator.index = 0;
                return false;
            }
            else
            {   
                // If animator doesn't repeat, destroy this object.
                animator.parent.destroy = true;
                return true;
            }
        }
        else
        {
            animator.parent.getComponent(Sprite).image = animator.sprite;
        }

        return false;
    }
    
    /**
     * Advance the animator to its next frame.
     * @param {Animator} animator 
     */
    advanceFrame(animator)
    {
        // Advance animator index and get next frame.
        animator.index++;
        animator.sprite = animator.frames[animator.index];

        // Reset time till next frame.
        animator.currentTime = animator.timing;
    }
}