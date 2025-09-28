# TODO: Implement 4th Offer Logic

## Completed Tasks
- [x] Add helper function `isMondayOrTuesdayInIST` in Offers.tsx to check the day in Indian time zone
- [x] Modify `handleClaimOffer` in Offers.tsx to check conditions for the 4th offer (Monday/Tuesday and order total > ₹299)
- [x] Show popup with specified message if conditions are not met
- [x] Update App.tsx to set deliveryCharge to 0 when the 4th offer is applied
- [x] Update Checkout.tsx to accept and display dynamic deliveryCharge
- [x] Pass deliveryCharge prop from App.tsx to Checkout component

## Testing
- [ ] Test the offer application on Monday/Tuesday with order total > ₹299
- [ ] Test the offer application on other days or with order total ≤ ₹299 (should show popup)
- [ ] Verify that delivery charge is set to 0 when the 4th offer is applied
- [ ] Verify that delivery charge is normal when other offers are applied or no offer is applied
