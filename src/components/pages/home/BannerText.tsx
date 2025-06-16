import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};
const API_URL = import.meta.env.VITE_API_URL;
export default function ElementorStyleBanner() {
    const [data, setData] = useState<{
        title: string;
        subtitle: string;
        phrases: string[];
    } | null>(null);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const measureRef = useRef<HTMLSpanElement>(null);

    const currentPhrase = data?.phrases[phraseIndex] || '';

    // 🔹 Fetch from PHP API
    useEffect(() => {
        fetch(`${API_URL}banner_text`) // Replace with actual URL
            .then((res) => res.json())
            .then((json) => {
                if (json.phrases && Array.isArray(json.phrases)) {
                    setData(json);
                } else {
                    console.error("Invalid format from API");
                }
            })
            .catch((err) => console.error("Error fetching banner data:", err));
    }, []);

    // 🔹 Measure widest word
    useEffect(() => {
        if (!measureRef.current || !data?.phrases?.length) return;

        let maxWidth = 0;
        data.phrases.forEach((phrase) => {
            measureRef.current!.innerText = phrase;
            const width = measureRef.current!.offsetWidth;
            if (width > maxWidth) maxWidth = width;
        });

        setContainerWidth(maxWidth);
    }, [data]);

    // 🔹 Phrase change loop
    useEffect(() => {
        if (!data?.phrases?.length) return;

        const timer = setTimeout(() => {
            setPhraseIndex((idx) => (idx + 1) % data.phrases.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [phraseIndex, data]);

    if (!data) return null; // or a loader

    return (
        <Box className="btext-head" sx={{ padding: 4, textAlign: 'center', fontFamily: 'inherit' }}>
            <Typography
                variant="h2"
                component="h3"
                fontWeight="bold"
                className="elementor-headline elementor-headline-animation-type-swirl elementor-headline-letters"
            >
                <span className="elementor-headline-plain-text elementor-headline-text-wrapper find-youy bodoni-bold">
                    {data.title}&nbsp;
                </span>

                <Box
                    className="elementor-headline-dynamic-wrapper elementor-headline-text-wrapper change-color bodoni-italic"
                    sx={{
                        display: 'inline-flex',
                        whiteSpace: 'nowrap',
                        width: containerWidth ? `${containerWidth}px` : '150px',
                        position: 'relative',
                    }}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={phraseIndex}
                            className="elementor-headline-dynamic-text elementor-headline-text-active "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'inline-flex' }}
                        >
                            {currentPhrase.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="elementor-headline-dynamic-letter elementor-headline-animation-in"
                                    variants={letterVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    style={{ display: 'inline-block' }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.span>
                    </AnimatePresence>
                </Box>
            </Typography>

            {/* Subtitle from API */}
            <Typography variant="h5" mt={2} className="banner-bt-text bodoni-normal">
                {data.subtitle}
            </Typography>

            {/* Hidden span for measuring width */}
            <span
                ref={measureRef}
                style={{
                    visibility: 'hidden',
                    whiteSpace: 'nowrap',
                    fontWeight: 700,
                    fontSize: '1.875rem',
                    fontFamily: 'inherit',
                    letterSpacing: '0.01562em',
                    lineHeight: 1.2,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 0,
                    overflow: 'hidden',
                    zIndex: -1,
                }}
            />
        </Box>
    );
}
