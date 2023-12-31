module.exports = ({ env }) => ({
    
    email: 
    {
      config: 
      {
        provider: 'nodemailer',
        providerOptions: 
        {
          host: env('SMTP_HOST'),
          port: env('SMTP_PORT'),
          auth: 
          {
            type: 'login',
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          // ... any custom nodemailer options
        },
        settings: 
        {
          defaultFrom: 'coder_dev_test@outlook.com',
          defaultReplyTo: 'coder_dev_test@outlook.com',
        },
      },
    },
    
});
  