import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('email').click();

  await page.getByPlaceholder('email').fill('madarasemini@gmail.com');

  await page.getByPlaceholder('Password').click();

  await page.getByPlaceholder('Password').fill('Abcd@123');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/home');

  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page).toHaveURL('http://localhost:3000/viewProfilePage');

  await page.getByRole('link', { name: 'Control Panel' }).click();
  await expect(page).toHaveURL('http://localhost:3000/controlPanel');

  await page.getByRole('link', { name: 'Crop Yield' }).click();
  await expect(page).toHaveURL('http://localhost:3000/cropYield');

  await page.getByRole('link', { name: 'Gallery' }).click();
  await expect(page).toHaveURL('http://localhost:3000/gallery');

  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL('http://localhost:3000/settings');

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link', { name: 'Add inputs>' }).click();
  await expect(page).toHaveURL('http://localhost:3000/elecinput');

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link', { name: 'Add Inputs>' }).click();
  await expect(page).toHaveURL('http://localhost:3000/npkinput');

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link', { name: 'View All>' }).click();
  await expect(page).toHaveURL('http://localhost:3000/history');

  await page.getByRole('link', { name: 'Smart Farmer' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('nav:has-text("My FarmMatara - Sri LankaMadara SeminiFarm Assistant Smart Farmer")').getByRole('link').nth(1).click();
  await expect(page).toHaveURL('http://localhost:3000/viewProfilePage');

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

});