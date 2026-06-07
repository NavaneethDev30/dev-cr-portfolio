
// import BlurText from "./BlurText";



// <BlurText
//   text="Isn't this so cool?!"
//   delay={200}
//   animateBy="words"
//   direction="top"
//   onAnimationComplete={handleAnimationComplete}
//   className="text-2xl mb-8"
// />

// export default handleAnimationComplete;

'use client';

'use client';

import BlurText from './BlurText';

export default function AnimatedText({ text, className = '' }) {
  return (
    <BlurText
      text={text}
      delay={400}
      animateBy="words"
      direction="top"
      className={className}
    />
  );
}