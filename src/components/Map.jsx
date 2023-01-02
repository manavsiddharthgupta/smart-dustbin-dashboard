const Map = () => {
  return (
    <div className="outer_map">
      <h1>Dustbin Location</h1>
      <iframe
        title="Dustbin Location"
        src="https://my.atlistmaps.com/map/206e81c7-20d2-4e6b-9c06-679193a2af83?share=true"
        allow="geolocation"
        width="100%"
        height="92%"
        scrolling="no"
        className="map"
      ></iframe>
    </div>
  );
};
export default Map;
