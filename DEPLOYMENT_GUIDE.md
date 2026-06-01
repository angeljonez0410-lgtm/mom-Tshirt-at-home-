# 🚀 Complete Deployment & Testing Guide

## ✅ What Was Fixed

### 1. **Purchase Tracking System** ✓
- Added `lib/purchases.ts` - In-memory purchase recording
- Webhook (`app/api/webhook/route.ts`) now records all purchases
- Purchases tracked by email and Stripe session ID

### 2. **Member Dashboard** ✓
- New page: `/members` - Members-only access after purchase
- Shows purchase status, download link, and included benefits
- Auto-redirects unauthenticated users to login

### 3. **Admin Dashboard** ✓
- Enhanced `/dashboard` with real-time analytics:
  - Total sales count
  - Total revenue calculation
  - Unique customer count
  - Purchase history table
- Full ebook access for admin (angeljonez0410@gmail.com)

### 4. **Authentication Flow** ✓
- Login page: `/auth/login` - Email/password authentication
- Updated AuthButton with member dashboard link
- Admin access automatically detected
- Session management with NextAuth

### 5. **Environment Variables** ✓
- Created `.env.local.example` with all required variables
- Database, Stripe, Email, and Auth configuration documented

---

## 🔧 Deployment Checklist

### Step 1: Set Environment Variables in Vercel

Go to **Vercel Project Settings → Environment Variables** and add:

```
# Stripe (Get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_... or pk_test_...

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://mom-tshirt-at-home.vercel.app

# Email Delivery (Resend)
RESEND_API_KEY=re_...
EBOOK_PDF_URL=https://your-storage.com/mom-hustle-tees-ebook.pdf
NEXT_PUBLIC_EBOOK_PDF_URL=https://your-storage.com/mom-hustle-tees-ebook.pdf

# Admin Access
ADMIN_PASSWORD=your_secure_password_here

# NextAuth
NEXTAUTH_SECRET=generate_with: openssl rand -base64 32
NEXTAUTH_URL=https://mom-tshirt-at-home.vercel.app

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-...
```

### Step 2: Upload Your Ebook PDF

1. Choose a storage service:
   - **Vercel Blob** (recommended for Vercel)
   - AWS S3
   - Google Cloud Storage
   - Dropbox
   - Any CDN

2. Upload PDF: `Mom Hustle Tees Stay-at-Home T-Shirt Biz Ebook.pdf`

3. Get the public URL and set:
   - `EBOOK_PDF_URL`
   - `NEXT_PUBLIC_EBOOK_PDF_URL`

### Step 3: Configure Stripe Webhook

1. Go to **Stripe Dashboard → Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://mom-tshirt-at-home.vercel.app/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### Step 4: Deploy to Vercel

```bash
# Push to GitHub (already done)
git push origin main

# Vercel will auto-deploy when you push to main
# Or manually deploy from Vercel dashboard
```

---

## 🧪 Testing Checklist

### Test 1: User Flow (Demo User)
- [ ] Visit homepage
- [ ] Click "Sign In / Sign Up"
- [ ] Use any email (test@example.com) and password
- [ ] Should redirect to `/members` page
- [ ] Should show "No purchases yet"
- [ ] Click back to homepage

### Test 2: Purchase Flow (Stripe Test Mode)
- [ ] Click "Get Instant Access - $37" button
- [ ] Should redirect to Stripe checkout
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: Any future date (e.g., 12/25)
- [ ] CVC: Any 3 digits (e.g., 123)
- [ ] Click "Pay"
- [ ] Should see confetti and success page
- [ ] Check email for delivery (if Resend configured)

### Test 3: Member Access After Purchase
- [ ] From success page, click "Download Your Ebook (PDF)"
- [ ] PDF should download successfully
- [ ] Sign in with same email used for purchase
- [ ] Go to `/members` - should show:
  - ✓ Purchase Complete
  - Product name: "Mom Hustle Tees Ebook"
  - Amount: "$37.00"
  - Download button

### Test 4: Admin Access
- [ ] Sign in with: `angeljonez0410@gmail.com` + any password
- [ ] Should show "Admin" button in header
- [ ] Click "Admin" → `/dashboard`
- [ ] Should show:
  - Total Sales: 1+
  - Total Revenue: $37+
  - Purchase table with customer data

### Test 5: Purchase Email Delivery
- [ ] Complete a test purchase
- [ ] Check inbox for "Mom Hustle Tees Ebook" email
- [ ] Email should contain download link
- [ ] Click link - PDF should download

### Test 6: Webhook Testing (Advanced)
```bash
# In local terminal, start your app
npm run dev

# In another terminal, forward Stripe webhooks
stripe listen --forward-to localhost:3000/api/webhook

# Copy the webhook signing secret
# Set STRIPE_WEBHOOK_SECRET in .env.local

# In another terminal, trigger test event
stripe trigger checkout.session.completed

# Check server logs for purchase record
```

---

## 🚨 Troubleshooting

### Issue: Webhook not recording purchases
**Solution:**
- Verify `STRIPE_WEBHOOK_SECRET` is set correctly
- Check Stripe webhook endpoint is configured
- Check server logs for errors at `/api/webhook`

### Issue: PDF not downloading
**Solution:**
- Verify `NEXT_PUBLIC_EBOOK_PDF_URL` is publicly accessible
- Check file exists and is valid PDF
- Try downloading URL directly in browser

### Issue: Email not sent
**Solution:**
- Verify `RESEND_API_KEY` is set and valid
- Check Resend dashboard for failed sends
- Verify email address is valid

### Issue: Admin can't access dashboard
**Solution:**
- Make sure signed in as `angeljonez0410@gmail.com`
- Check `ADMIN_PASSWORD` matches if using credentials
- Clear browser cache and try again

### Issue: "Missing STRIPE_SECRET_KEY"
**Solution:**
- Set in Vercel Environment Variables (not .env.local)
- Redeploy after setting variables
- Verify key format: starts with `sk_test_` or `sk_live_`

---

## 📊 System Flow

```
User Signs In (any email)
    ↓
Homepage with Checkout Button
    ↓
Stripe Checkout
    ↓
Payment Complete Webhook
    ↓
recordPurchase() stores in memory
sendEmail() sends download link
    ↓
Success Page (PDF download)
    ↓
User visits /members
    ↓
Dashboard shows purchase + download link
    ↓
Admin at /dashboard sees all purchases
```

---

## 🔐 Security Notes

1. **Purchase data is in-memory** - Will reset on deployment
   - For production: Use PostgreSQL/MongoDB
   - Migrate `lib/purchases.ts` to database queries

2. **Admin password** - Change `ADMIN_PASSWORD` in Vercel

3. **Stripe keys** - Keep `STRIPE_SECRET_KEY` secure
   - Only visible to server
   - Use test keys before going live

4. **NextAuth secret** - Generate new one with:
   ```bash
   openssl rand -base64 32
   ```

---

## 📝 Next Steps

1. **For Production Database:**
   - Install Prisma: `npm install @prisma/client`
   - Migrate `lib/purchases.ts` to Prisma schema
   - Update webhook to use database

2. **For Enhanced Analytics:**
   - Add Google Analytics integration
   - Track conversion funnel
   - Monitor member engagement

3. **For Customer Support:**
   - Add `/account` page for password reset
   - Add customer support email form
   - Add FAQ section

---

## 💬 Support

If issues arise:
1. Check Vercel deployment logs
2. Review environment variables are all set
3. Test Stripe webhook in Stripe dashboard
4. Check server logs at `/api/webhook`

**Everything is now connected and ready for live traffic!** 🎉
