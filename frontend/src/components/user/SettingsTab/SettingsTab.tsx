const SettingsTab: React.FC = () => (
  <div className="tab-content">
    <div className="section-header">
      <h2>Configuración</h2>
    </div>
    
    <div className="settings-grid">
      <div className="settings-card">
        <h3>Notificaciones</h3>
        <div className="settings-item">
          <label>
            <input type="checkbox" defaultChecked />
            Ofertas y promociones
          </label>
        </div>
        <div className="settings-item">
          <label>
            <input type="checkbox" defaultChecked />
            Actualizaciones de pedidos
          </label>
        </div>
        <div className="settings-item">
          <label>
            <input type="checkbox" />
            Newsletter
          </label>
        </div>
      </div>
      
      <div className="settings-card">
        <h3>Privacidad</h3>
        <div className="settings-item">
          <label>
            <input type="checkbox" defaultChecked />
            Perfil público
          </label>
        </div>
        <div className="settings-item">
          <label>
            <input type="checkbox" />
            Compartir datos de compra
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsTab;