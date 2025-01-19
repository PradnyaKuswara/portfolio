import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const useToast = () => {
  const { t } = useTranslation();

  const notify = (message: string, status: string) => {
    return toast(t(`toast.${status}`, { message }), {
      icon: (() => {
        switch (status) {
          case 'success':
            return '🎉';
          case 'error':
            return '😢';
          case 'warning':
            return '⚠️';
          case 'info':
            return '💡';
          default:
            return '👋';
        }
      })(),
      style: {
        borderRadius: '8px',
        color: '#fff',
        boxShadow: '0px 0px 8px rgba(0,0,0,0.1)',
        border: (() => {
          switch (status) {
            case 'success':
              return '1px solid #2ecc71';
            case 'error':
              return '1px solid #e74c3c';
            case 'warning':
              return '1px solid #f39c12';
            case 'info':
              return '1px solid #3498db';
            default:
              return '1px solid #333';
          }
        })(),
        background: (() => {
          switch (status) {
            case 'success':
              return '#2ecc71';
            case 'error':
              return '#e74c3c';
            case 'warning':
              return '#f39c12';
            case 'info':
              return '#3498db';
            default:
              return '#333';
          }
        })(),
      },
    });
  };

  return notify;
};

export default useToast;
