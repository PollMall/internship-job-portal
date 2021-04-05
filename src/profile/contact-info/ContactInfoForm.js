import React, { useState } from 'react';
import {
  TextField, InputLabel, Button, ButtonGroup,
} from '@material-ui/core';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../../queries/CountryQueries';
import Info from '../../Info';

function ContactInfoForm({ contactInfo: actualContactInfo, onSave, onCancel }) {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [contactInfo, setContactInfo] = useState(actualContactInfo);

  const memoCountries = React.useMemo(() => (
    data?.counties.map((d) => ({ value: d, label: d.name }))
  ), [data]);

  const onSaveClick = () => {
    onSave(contactInfo);
    onCancel();
  };

  return (
    <>
      <Info loading={loading} error={!!error} />
      <form>
        <TextField
          fullWidth
          value={contactInfo?.email || ''}
          label="Email"
          name="email"
          id="email"
          onChange={(e) => (
            setContactInfo({ ...contactInfo, email: e.target.value })
          )}
        />
        <TextField
          fullWidth
          value={contactInfo?.phone || ''}
          label="Phone"
          name="phone"
          id="phone"
          onChange={(e) => (
            setContactInfo({ ...contactInfo, phone: e.target.value })
          )}
        />
        <TextField
          fullWidth
          value={contactInfo?.city || ''}
          label="City"
          name="city"
          id="city"
          onChange={(e) => (
            setContactInfo({ ...contactInfo, city: e.target.value })
          )}
        />
        {data && (
        <InputLabel id="country">
          Country
          <Select
            name="country"
            aria-labelledby="country"
            data-testid="contact-info-country"
            options={memoCountries}
            defaultValue={contactInfo && { value: contactInfo.country, label: contactInfo.country?.name }}
            onChange={(e) => setContactInfo({ ...contactInfo, country: e.value })}
          />
        </InputLabel>
        )}
        <TextField
          fullWidth
          value={contactInfo?.website || ''}
          label="Website"
          name="website"
          id="website"
          onChange={(e) => (
            setContactInfo({ ...contactInfo, website: e.target.value })
          )}
        />
        <ButtonGroup size="small">
          <Button onClick={onSaveClick}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export default ContactInfoForm;
