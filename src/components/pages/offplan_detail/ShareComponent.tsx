import { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Box,
    Stack,
    InputAdornment,
} from '@mui/material';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
} from 'react-share';

interface ShareProps {
    url: string;
    adTitle: string;
}

const ShareComponent = ({ url, adTitle }: ShareProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });
    };

    return (
        <Box
            sx={{
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: '#fff',
                mt: 2,
            }}
        >
            <Typography variant="subtitle1" gutterBottom>
                Get another opinion,
            </Typography>
            <Typography variant="h6" gutterBottom>
                Share <strong>{adTitle}</strong>
            </Typography>

            <Grid container container-inside spacing={2} sx={{ mt: 1 }} className="at-pop-split-2">
                {/* Copy Link Input Group */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={url}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color={copied ? 'success' : 'primary'}
                                        onClick={copyToClipboard}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Social Share Buttons */}
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} justifyContent="flex-start">
                        <FacebookShareButton url={url}>
                            <FacebookIcon size={48} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={url} title={adTitle}>
                            <TwitterIcon size={48} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={url} title={adTitle}>
                            <WhatsappIcon size={48} round />
                        </WhatsappShareButton>
                        <LinkedinShareButton url={url} title={adTitle}>
                            <LinkedinIcon size={48} round />
                        </LinkedinShareButton>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShareComponent;
