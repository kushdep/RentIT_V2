function GoogleMap({placeId}) {
  return (
    <>
      <iframe
        width="450"
        height="250"
        frameborder="0"
        style={{border:0}}
        referrerpolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_PLACES_MAP_KEY}&q=place_id:${placeId}`}
        allowfullscreen
      ></iframe>
    </>
  );
}

export default GoogleMap;
