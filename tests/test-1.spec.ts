import { test, expect, Page, Locator } from '@playwright/test';

test.describe('Tests of main page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://smartapp.technology/');

    await page
      .locator('#form')
      .getByRole('heading', { name: 'Let us do the work for you!' })
      .scrollIntoViewIfNeeded();
  });

  test('Visability of elements', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'First name*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last name*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Work email*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'How can we help you?*' })).toBeVisible();
    await expect(page.getByText('Attach file')).toBeVisible();
    await expect(page.getByRole('button', { name: 'SEND MESSAGE' })).toBeVisible();
  });

  test('Form accepts valid data', async ({ page }) => {
    await page.getByRole('textbox', { name: 'First name*' }).fill('Yegor');
    await page.getByRole('textbox', { name: 'Last name*' }).fill('Khary');
    await page.getByRole('textbox', { name: 'Work email*' }).fill('test@mail.ru');
    await page.getByRole('textbox', { name: 'How can we help you?*' }).fill('Test message');

    expect(page.getByRole('textbox', { name: 'First name*' })).toHaveValue('Yegor');
    expect(page.getByRole('textbox', { name: 'Last name*' })).toHaveValue('Khary');
    expect(page.getByRole('textbox', { name: 'Work email*' })).toHaveValue('test@mail.ru');
    expect(page.getByRole('textbox', { name: 'How can we help you?*' })).toHaveValue(
      'I need help with website',
    );
  });

  test('required fields cannot be submitted empty', async ({ page }) => {
    const button = page.getByRole('button', { name: 'SEND MESSAGE' });
    const firstName = page.getByRole('textbox', { name: 'First name*' });
    const lastName = page.getByRole('textbox', { name: 'Last name*' });
    const email = page.getByRole('textbox', { name: 'Work email*' });
    const message = page.getByRole('textbox', {
      name: 'How can we help you?*',
    });

    await expect(firstName).toHaveAttribute('aria-required', 'true');
    await expect(lastName).toHaveAttribute('aria-required', 'true');
    await expect(email).toHaveAttribute('aria-required', 'true');
    await expect(message).toHaveAttribute('aria-required', 'true');

    await button.click();

    await expect(firstName).toHaveAttribute('aria-invalid', 'true');
    await expect(lastName).toHaveAttribute('aria-invalid', 'true');
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(message).toHaveAttribute('aria-required', 'true');
  });

  test('Invalid email is rejected', async ({ page }) => {
    const firstName = page.getByRole('textbox', { name: 'First name*' });
    const lastName = page.getByRole('textbox', { name: 'Last name*' });
    const email = page.getByRole('textbox', { name: 'Work email*' });
    const message = page.getByRole('textbox', {
      name: 'How can we help you?*',
    });
    const button = page.getByRole('button', {
      name: 'SEND MESSAGE',
    });

    await firstName.fill('Yegor');
    await lastName.fill('Khary');
    await email.fill('test@');
    await message.fill('Test message');

    await expect(email).toHaveValue('test@');
    await expect(email).toHaveAttribute('type', 'email');

    await button.click();

    await expect(email).toHaveAttribute('aria-invalid', 'true');
  });

  test('too long values are limited by maxlength', async ({ page }) => {
    const firstName = page.getByRole('textbox', { name: 'First name*' });
    const lastName = page.getByRole('textbox', { name: 'Last name*' });
    const email = page.getByRole('textbox', { name: 'Work email*' });
    const message = page.getByRole('textbox', {
      name: 'How can we help you?*',
    });

    const fields = [
      { field: firstName, maxLength: 400 },
      { field: lastName, maxLength: 400 },
      { field: email, maxLength: 400 },
      { field: message, maxLength: 2000 },
    ];

    for (const { field, maxLength } of fields) {
      await expect(field).toHaveAttribute('maxlength', String(maxLength));

      const longValue = 'A'.repeat(maxLength + 100);

      await field.fill(longValue);

      await expect(field).toHaveValue('A'.repeat(maxLength));
    }
  });

  test('contact form is usable on mobile width', async ({ page }) => {
    await page.setViewportSize({
      width: 375,
      height: 812,
    });

    await page.reload();

    await page
      .locator('#form')
      .getByRole('heading', { name: 'Let us do the work for you!' })
      .scrollIntoViewIfNeeded();

    await expect(page.getByRole('textbox', { name: 'First name*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last name*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Work email*' })).toBeVisible();
    await expect(
      page.getByRole('textbox', {
        name: 'How can we help you?*',
      }),
    ).toBeVisible();

    await expect(page.getByText('Attach file')).toBeVisible();
    await expect(page.getByRole('button', { name: 'SEND MESSAGE' })).toBeVisible();

    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );

    expect(hasHorizontalScroll).toBe(false);
  });
});
