# 📧 EmailJS Setup Guide for Adiel Beauty Contact Form

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 2. Set Up Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose "Gmail" (since you want to use yagmail/Gmail)
- Connect your Gmail account (paulineadiel@gmail.com)
- **Save the Service ID** - you'll need this!

### 3. Create Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use this template content:

```html
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your website contact form:

**Customer Details:**
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{from_phone}}

**Message:**
{{message}}

---
This message was sent from your Adiel Beauty website contact form.
```

- **Save the Template ID** - you'll need this too!

### 4. Get Your Public Key
- Go to "Account" → "API Keys"
- Copy your **Public Key**

### 5. Update Configuration File
Open `src/config/emailjs.ts` and replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxxx', // Your actual service ID
  TEMPLATE_ID: 'template_xxxxxxx', // Your actual template ID
  PUBLIC_KEY: 'xxxxxxxxxxxxxxxxxxxxx', // Your actual public key
  TO_EMAIL: 'paulineadiel@gmail.com',
  TO_NAME: 'Adiel Beauty'
};
```

## 🔧 Advanced Configuration

### Custom Email Template Variables
You can customize the template to include more fields:

```html
Subject: New Beauty Consultation Request

**Customer Information:**
- Full Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{from_phone}}
- Preferred Contact: {{preferred_contact}}

**Beauty Needs:**
{{message}}

**Product Interest:**
{{product_interest}}

**Budget Range:**
{{budget_range}}
```

### Gmail Security Settings
If you encounter authentication issues:
1. Enable "Less secure app access" in your Google Account
2. Or use App Passwords (recommended)
3. Make sure 2FA is properly configured

## 🧪 Testing Your Setup

### 1. Test the Form
- Fill out the contact form on your website
- Submit the form
- Check your Gmail inbox (paulineadiel@gmail.com)

### 2. Check EmailJS Dashboard
- Go to "Logs" in your EmailJS dashboard
- You should see successful email sends
- Check for any error messages

### 3. Troubleshooting
Common issues and solutions:
- **Service not found**: Check your Service ID
- **Template not found**: Check your Template ID
- **Authentication failed**: Check Gmail settings
- **Rate limiting**: Free tier has limits (200 emails/month)

## 📱 Mobile & Responsive Testing

Test your contact form on:
- ✅ Desktop browsers
- ✅ Mobile devices
- ✅ Different screen sizes
- ✅ Various email clients

## 🔒 Security Considerations

- Your public key is safe to expose in frontend code
- Never expose your private keys
- EmailJS handles server-side email sending securely
- Consider adding CAPTCHA for spam protection

## 💰 Pricing & Limits

**Free Tier:**
- 200 emails per month
- Basic templates
- Gmail integration

**Paid Plans:**
- $15/month: 1,000 emails
- $25/month: 2,500 emails
- Custom plans available

## 🎯 Next Steps

Once EmailJS is working:
1. Test with real customers
2. Monitor email delivery rates
3. Set up email notifications for new messages
4. Consider adding auto-reply templates
5. Integrate with your CRM if needed

## 📞 Support

If you need help:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)
- Contact EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**🎉 Congratulations!** Your contact form will now send real emails to your Gmail account using EmailJS!
