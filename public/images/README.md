# Images Directory

This directory contains all the images used in the Etqaan Academy application.

## Folder Structure:

### `/profile/`

Profile images for different user types:

- `A1.png` - Student profile image
- `teacher.png` - Instructor profile image
- `admin.png` - Administrator profile image
- `default.png` - Default profile image

**Recommended specs:**

- Square images (200x200px or larger)
- High quality PNG or JPG format
- Clear, professional appearance

### `/students/`

Student images for the memorization progress cards and dashboards:

- `student1.png` through `student5.png` - Individual student photos
- `Memorization.png` - Generic memorization illustration

**Recommended specs:**

- Square or portrait images
- 150x150px minimum size
- PNG format preferred for transparency

### `/backgrounds/`

Background patterns and decorative elements:

- Islamic geometric patterns
- Educational themed backgrounds
- Subtle textures and gradients

## Usage in Components:

### Dynamic Profile Image (Header):

```tsx
<Image
  src={routeInfo.profileImage}
  alt="الملف الشخصي"
  width={48}
  height={48}
  className="rounded-full object-cover"
/>
```

### Student Dashboard Image:

```tsx
<Image
  src="/images/students/Memorization.png"
  alt="الطالب"
  width={200}
  height={200}
  className="rounded-full object-cover shadow-lg"
/>
```

## Route-Specific Images:

- **Instructor routes** (`/instructor/*`): Use `teacher.png`
- **Student routes** (`/student/*`): Use `A1.png`
- **Dashboard routes** (`/dashboard`): Use `A1.png`
- **General routes** (`/`): Use `default.png`

## Notes:

- All images are served from the `/public` directory
- Use Next.js `Image` component for optimal performance
- Consider WebP format for better compression
- Maintain consistent aspect ratios across similar image types
- Use descriptive Arabic alt text for accessibility
