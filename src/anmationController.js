const animationController = (() => {
    let animationPlaying = false;
    const toggleAnim = () => animationPlaying ? animationPlaying = false : animationPlaying = true;
    return {
        toggleAnim,
        get isPlaying() { return animationPlaying }
    }
})();

export { animationController }