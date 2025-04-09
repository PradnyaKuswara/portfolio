import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Box,
  HStack,
  useClipboard,
} from '@chakra-ui/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconShare3,
} from '@tabler/icons-react';


export default function SharePopover() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const { onCopy } = useClipboard(url);

  const openShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const encodedUrl = encodeURIComponent(url);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Popover placement="top" closeOnBlur={true}>
      <PopoverTrigger>
        <IconButton
          icon={<IconShare3 />}
          aria-label="Share"
          variant="ghost"
          colorScheme="blue"
        />
      </PopoverTrigger>

      <PopoverContent className='bg-primary' bg="blue.800" color="white" borderColor="blue.700">
        <PopoverArrow bg="blue.800" />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Share TO</PopoverHeader>
        <PopoverBody>
          <HStack spacing={4} justify="center">
            <IconButton
              icon={<IconBrandFacebook />}
              aria-label="Share on Facebook"
              onClick={() => openShare('facebook')}
              colorScheme="facebook"
              variant="ghost"
            />
            <IconButton
              icon={<IconBrandTwitter />}
              aria-label="Share on Twitter"
              onClick={() => openShare('twitter')}
              colorScheme="twitter"
              variant="ghost"
            />
            <IconButton
              icon={<IconBrandWhatsapp />}
              aria-label="Share on WhatsApp"
              onClick={() => openShare('whatsapp')}
              colorScheme="whatsapp"
              variant="ghost"
            />
            <IconButton
              icon={<IconBrandInstagram />}
              aria-label="Share on Instagram"
              onClick={() => alert('Instagram tidak mendukung share browser.')}
              color="pink.400"
              variant="ghost"
            />
          </HStack>
          <Box mt={3} textAlign="center">
            <button
              onClick={onCopy}
              className="text-sm text-blue-200 underline hover:text-white"
            >
              Copy Link
            </button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
